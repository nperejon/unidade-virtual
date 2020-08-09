module.exports = app => {
  const { existsOrError, notExistsOrError } = app.api.validator;

  const save = async (req, res) => {
    const bodyQuestions = { ...req.body };
    const answers = new Array();

    Object.keys(bodyQuestions).forEach(async n => {
      if (n.startsWith("answer_")) {
        const indices = [];
        await indices.push(Object.keys(bodyQuestions).indexOf(n));
        Object.values(bodyQuestions).forEach((c, i) => {
          if (indices.includes(i)) {
            answers.push(c);
          }
        });
      }
    });

    if (req.params.id) bodyQuestions.id = req.params.id;
    try {
      existsOrError(
        bodyQuestions.id,
        "É necessário um id válido para cadastrar sua resposta."
      );
    } catch (msg) {
      res.status(400).send(msg);
    }

    const answersToInsert = answers.map((n, i) => ({
      text: n,
      answerNumber: i + 1,
      userId: bodyQuestions.userId,
      challengeId: bodyQuestions.id
    }));
    app
      .db("answers")
      .insert(answersToInsert)
      .then(_ => res.status(204).send())
      .catch(err => res.status(500).send(err));

    console.log(answersToInsert);
  };

  const get = async (req, res) => {
    const bodyQuestions = { ...req.body };
    if (req.params.id) bodyQuestions.id = req.params.id;
    if (req.params.user) bodyQuestions.user = req.params.user;

    app
      .db({ c: "challenges", u: "users", q: "questions" })
      .select("c.name", "c.description", "q.text", "q.questionNumber", {
        author: "u.name"
      })
      .whereRaw("?? = ??", ["u.id", "c.userId"])
      .where({ "c.id": bodyQuestions.id })
      .then(async all => {
        const questions = new Array();
        let nQ = 0;
        await all.forEach(async n => {
          if (questions.length != 0) {
            if (n.questionNumber > nQ) {
              nQ++;
              await questions.push({
                question: n.text,
                questionNumber: n.questionNumber
              });
            }
          } else {
            await questions.push({
              question: n.text,
              questionNumber: n.questionNumber
            });
            nQ++;
          }
        });

        getPerguntas(questions, all);
      });
    async function getPerguntas(questions, alls) {
      let questionsAndAnswers = new Array();
      app
        .db("answers")
        .select("text", "answerNumber")
        .where({ challengeId: bodyQuestions.id, userId: bodyQuestions.user })
        .then(all =>
          all.forEach(async n => {
            await questions.forEach(async n => {
              await all.forEach(async a => {
                if (a.answerNumber == n.questionNumber) {
                  await questionsAndAnswers.push({
                    question: n.question,
                    questionNumber: n.questionNumber,
                    answer: a.text
                  });
                }
              });
            });
            var objFinal = {
              name: alls[0].name,
              description: alls[0].description,
              author: alls[0].author,
              questions: questionsAndAnswers
            };

            res.json(objFinal);
          })
        );
    }
  };

  return { save, get };
};

const nlp = require('compromise');

// English text
const englishText = `Evaluating models
  Note: AutoML Translation capabilities are offered by both the AutoML API and the Cloud Translation - Advanced API. We recommend that you use the Cloud Translation - Advanced API to create datasets and models because future enhancements apply only to the Cloud Translation - Advanced API. For more information, see Upgrade AutoML resources.
  After training a model, AutoML Translation uses items from the TEST set to evaluate the quality and accuracy of the new model. AutoML Translation expresses the model quality using its BLEU (Bilingual Evaluation Understudy) score, which indicates how similar the candidate text is to the reference texts, with values closer to one representing more similar texts.
  The BLEU score provides an overall assessment of model quality. You can also evaluate the model output for specific data items by exporting the TEST set with the model predictions. The exported data includes both the reference text (from the original dataset) and the model's candidate text.
  Use this data to evaluate your model's readiness. If you're not happy with the quality level, consider adding more (and more diverse) training sentence pairs. One option is to add more sentence pairs. Use the Add Files link in the title bar. Once you've added files, train a new model by clicking the Train New Model button on the Train page. Repeat this process until you reach a high enough quality level.`;

// Spanish text
const spanishText = `Modelle bewerten
  Hinweis: AutoML Translation-Funktionen werden sowohl von der AutoML API als auch von der Cloud Translation – Advanced API angeboten. Wir empfehlen, die Cloud Translation – Advanced API zum Erstellen von Datasets und Modellen zu verwenden, da zukünftige Verbesserungen nur für die Cloud Translation – Advanced API gelten werden. Weitere Informationen finden Sie unter AutoML-Ressourcen aktualisieren.
  Nach dem Training eines Modells verwendet AutoML Translation Elemente aus dem Set TEST, um die Qualität und Treffsicherheit des neuen Modells zu bewerten. AutoML Translation ermittelt die Modellqualität. Es nutzt dazu den BLEU-Score (Bilingual Evaluation Understudy) der angibt, wie ähnlich der Kandidatentext den Referenztexten ist, wobei Werte, die näher an 1 liegen, ähnlichere Texte darstellen.
  Mithilfe des BLEU-Scores kann auch die Modellqualität insgesamt bewertet werden. Außerdem können Sie die Modellausgabe im Hinblick auf bestimmte Datenelemente bewerten. Exportieren Sie dazu das Set TEST mit den Modellvorhersagen. Die exportierten Daten enthalten sowohl den Referenztext (aus dem Original-Dataset) als auch den Kandidatentext des Modells.
  Mit diesen Daten können Sie nun bewerten, ob Ihr Modell einsatzbereit ist. Wenn Sie mit der Qualität nicht zufrieden sind, fügen Sie am besten weitere (und stärker unterschiedliche) Paare von Trainingssätzen hinzu. Die eine Möglichkeit besteht also darin, weitere Satzpaare hinzuzufügen. Verwenden Sie dazu den Link Dateien hinzufügen in der Titelleiste. Nachdem Sie Dateien hinzugefügt haben, erstellen Sie ein neues Modell. Klicken Sie hierzu auf der Seite Trainieren auf die Schaltfläche Neues Modell trainieren. Wiederholen Sie diesen Vorgang, bis Sie eine ausreichend hohe Qualität erreicht haben.`;

// Polish text
const polishText = `Mozart w listach swych pisze, że zdarzyło mu się słyszeć kompozycję   „od   razu”   jak   akord.   Patrzył   na   rozwinięty pomysł muzyczny jak na obraz,  jak na rzeźbę,  którą można ogarnąć jednym spojrzeniem. Podobnie Gluck dostrzegł jeden ze swych   utworów w formach   przestrzennych:   w rytmie`;

// Russian text
const russianText = `Поражение
  Говорили о войне и задавали друг другу вопрос: сколько она продлится, я сказал – долго.
  А потом уже развернул для себя эту короткую мысль. Долго как длится поражение и разруха. Разруха – это надолго, её мало остановить, надо двигаться в другую сторону. Надо начать делать, не хаотически делать, а создавать. Нужны люди и они должны стать другими. Но есть ли такие, есть вообще что-то кроме надежды?
  А пока будет длиться разруха, в головах.`;

// Tokenizing English text
const englishTokens = nlp(englishText).sentences().out('array');

// Tokenizing Spanish text
const spanishTokens = nlp(spanishText).sentences().out('array');

// Tokenizing Polish text
const polishTokens = nlp(polishText).sentences().out('array');

// Tokenizing Russian text
const russianTokens = nlp(russianText).sentences().out('array');

console.log('English Tokens:', englishTokens);
console.log('Spanish Tokens:', spanishTokens);
console.log('Polish Tokens:', polishTokens);
console.log('Russian Tokens:', russianTokens);

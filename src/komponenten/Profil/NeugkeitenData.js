const NeuigkeitenList = [
    "Die einzige Grenze für unseren Realisierungserfolg von morgen wird unsere Zweifel an der heutigen Realisierungsfähigkeit sein. - Franklin D. Roosevelt",
    "Erfolg ist die Summe von kleinen Anstrengungen, die Tag für Tag wiederholt werden. - Robert Collier",
    "Die einzige Möglichkeit, großartige Arbeit zu leisten, besteht darin, zu lieben, was du tust. - Steve Jobs",
    "Erfolg besteht darin, von Fehler zu Fehler zu gehen, ohne dabei seine Begeisterung zu verlieren. - Winston Churchill",
    "Du musst der Wandel sein, den du in der Welt sehen möchtest. - Mahatma Gandhi",
    "Die Zukunft hängt davon ab, was du heute tust. - Mahatma Gandhi",
    "Erfolg kommt zu denen, die es wollen, mehr als diejenigen, die nur darüber nachdenken. - Unknown",
    "Wenn du etwas tun musst, um dich selbst zu beweisen, wem versuchst du es zu beweisen? - Unknown",
    "Erfolg ist, wie hoch du springen kannst, wenn du am Boden bist. - George S. Patton",
    "Du bist nie zu alt, um dir ein neues Ziel zu setzen oder einen neuen Traum zu träumen. - C.S. Lewis",
    "Der größte Ruhm besteht nicht darin, niemals zu fallen, sondern jedes Mal aufzustehen, wenn wir fallen. - Confucius",
    "Dein Leben wird nicht besser, wenn du aufhörst zu glauben, dass es besser werden kann. - Unknown",
    "Das Geheimnis des Erfolgs liegt darin, den eigenen Standpunkt zu verbessern, anstatt den Standpunkt der anderen zu kritisieren. - Dale Carnegie",
    "Erfolg ist das, was passiert, wenn Vorbereitung auf Gelegenheit trifft. - Seneca",
    "Glaube an dich selbst und alles ist möglich. - Chantal Sutherland",
    "Das größte Vergnügen im Leben besteht darin, das zu tun, von dem die Leute sagen, du könntest es nicht. - Walter Bagehot",
    "Erfolg ist kein Schlüssel zum Glück. Glück ist der Schlüssel zum Erfolg. Wenn du liebst, was du tust, wirst du erfolgreich sein. - Albert Schweitzer",
    "Gib jedem Tag die Chance, der schönste deines Lebens zu werden. - Mark Twain",
    "Erfolg ist einfach das Erreichen von Zielen, die für dich von Bedeutung sind. - Tony Robbins",
    "Es ist nie zu spät, das zu sein, was du hättest sein können. - George Eliot",
    "Erfolg ist eine Treppe, keine Tür. - Dwayne Johnson",
    "Dein Leben wird nicht besser, wenn du es einfach nur vorübergehen lässt. - John C. Maxwell",
    "Das Beste, was du je lernen kannst, ist, wie man für sich selbst denkt. - Theodore Roosevelt",
    "Erfolg ist das, was passiert, wenn du weiter machst, auch wenn du fällst. - Nick Vujicic",
    "Manchmal sind die besten Dinge im Leben nicht Dinge. - Art Buchwald",
    "Wenn du etwas erreichen willst, das du noch nie gehabt hast, musst du etwas tun, das du noch nie getan hast. - Thomas Jefferson",
    "Die einzige Person, die dich daran hindern kann, deine Ziele zu erreichen, bist du selbst. - Oprah Winfrey",
    "Große Geister haben immer heftige Gegner getroffen. - Albert Einstein",
    "Erfolg ist nicht der Schlüssel zum Glück. Glück ist der Schlüssel zum Erfolg. - Herman Cain",
    "Verwechsle nie Bildung mit Schule. - Benjamin Franklin",
    "Der einzige Ort, an dem der Erfolg vor dem Fleiß kommt, steht im Wörterbuch. - Vidal Sassoon",
    "Die beste Zeit für einen Neuanfang ist jetzt. - Unknown",
    "Lebe so, als würdest du morgen sterben. Lerne so, als würdest du ewig leben. - Mahatma Gandhi",
    "Der Preis des Erfolgs ist Hingabe, harte Arbeit und unablässiger Einsatz für das, was man erreichen will. - Vince Lombardi",
    "Die größte Entdeckung, die unsere Generation machen kann, ist, dass der Mensch, indem er seinen Geist ändert, die äußeren Bedingungen seines Lebens ändern kann. - William James",
    "Handle ständig so, als ob das, was du tust, einen Unterschied machen würde. Es tut es. - William James",
    "Wenn du denkst, dass du zu klein bist, um einen Unterschied zu machen, versuche mal zu schlafen, wenn eine Mücke im Raum ist. - Dalai Lama",
    "Nur wer sein Ziel kennt, findet den Weg. - Laozi",
    "Das Leben ist entweder ein gewagtes Abenteuer oder überhaupt nichts. - Helen Keller",
    "Man kann niemanden überholen, wenn man in seine Fußstapfen tritt. - Francois Truffaut",
    "Glaube an die Magie, die im Streben nach eigenen Träumen liegt. - Eleanor Roosevelt",
    "Wenn du nicht mutig genug bist, Risiken einzugehen, wirst du nie wissen, was dir im Leben entgeht. - Unknown",
    "Erfolg ist das, was passiert, wenn du deine Träume nicht aufgibst. - Unknown",
    "Die einzige Person, die du ändern kannst, bist du selbst, aber das reicht oft aus, um alles zu verändern. - Unknown",
    "Die beste Zeit für einen Neuanfang ist jetzt. - Unknown",
    "Erfolg ist kein Zufall. Es ist harte Arbeit, Ausdauer, Lernen, Opfer und vor allem, Liebe zu dem, was du tust. - Pelé",
    "Denke groß und deine Handlungen werden groß sein. - Mark Twain",
    "Dein Glaube an dich selbst und deine Ausdauer sind deine größten Vermögenswerte. - Unknown",
    "Handle so, als wäre es unmöglich zu scheitern. - Dorothea Brande",
    "Der Weg zum Erfolg ist, zweimal öfter zu scheitern, wie du erfolgreich sein willst. - Thomas J. Watson",
    "Erfolg besteht darin, von Misserfolg zu Misserfolg zu gehen, ohne seine Begeisterung zu verlieren. - Winston Churchill",
    "Große Träume beginnen mit kleinen Schritten. - Unknown",
    "Es ist nie zu spät, das zu sein, was du hättest sein können. - George Eliot",
    "Glaube an dich selbst und alles ist möglich. - Unknown",
    "Jeder Tag ist eine neue Chance, das zu werden, was du möchtest. - Unknown",
    "Erfolg kommt nicht zu dir, du gehst zu ihm. - Marva Collins",
    "Das Leben ist zu kurz, um sich mit durchschnittlichem Erfolg zufriedenzugeben. - Unknown",
    "Der einzige Weg, großartige Arbeit zu leisten, besteht darin, das zu lieben, was du tust. - Steve Jobs",
    "Du wirst erfolgreich sein, wenn du deine Träume groß genug träumst. - Unknown",
    "Der Weg zum Erfolg ist, hart zu arbeiten, niemals aufzugeben und das zu lieben, was du tust. - Pele",
    ];

export default NeuigkeitenList;
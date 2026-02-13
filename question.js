const questionsData = [
    {
        id: 1,
        question: "Sie speichern die Variable <code>y</code> mit <code>save datei.txt y -ascii</code> als Textdatei. Dann laden Sie die Datei mit <code>load datei.txt</code>. Wie heißt die geladene Variable?",
        options: [
            { text: "y", correct: false },
            { text: "y.txt", correct: false },
            { text: "datei", correct: true },
            { text: "datei.txt", correct: false }
        ]
    },
    {
        id: 2,
        question: "Was gibt der folgende Code am Bildschirm aus?<br><code>fprintf(1, 'Wert %3.1f\\n', 7.51);</code>",
        options: [
            { text: "Am Bildschirm wird Wert = 7.5 ausgegeben", correct: true },
            { text: "Nichts, weil fprintf keine Zahlen akzeptiert", correct: false },
            { text: "Fehler, weil \\n nicht erlaubt ist", correct: false },
            { text: "Am Bildschirm wird Wert = 7.51 ausgegeben", correct: false }
        ]
    },
    {
        id: 3,
        question: "Der Inhalt der Datei Beispiel.txt sei: <code>Gewicht 63.5 Größe 176</code>. Sie verwenden <code>G = fscanf(fin, '%s', 1)</code>. Was enthält G?",
        options: [
            { text: "\"Gewicht63.5...\"", correct: false },
            { text: "\"Gewicht 63.5 Größe 176\"", correct: false },
            { text: "\"Gewicht\"", correct: true },
            { text: "[\"Gewicht\" \"63.5\" ...]", correct: false }
        ]
    },
    {
        id: 4,
        question: "Was macht <code>sscanf</code>?",
        options: [
            { text: "Schreibt Daten in eine Datei", correct: false },
            { text: "Formatiert Text", correct: false },
            { text: "Liest Zahlen oder Text aus einer Zeichenkette (String)", correct: true },
            { text: "Wandelt Zahlen in Text um", correct: false }
        ]
    },
    {
        id: 5,
        question: "Wir fügen zu einem zeilenförmigen Cell Array C mit 3 Elementen ein viertes Element 'abc' hinzu. Was funktioniert?",
        options: [
            { text: "C(4) = 'abc'", correct: false },
            { text: "C{4} = 'abc'", correct: true },
            { text: "C(4) = \"abc\"", correct: false },
            { text: "C = {C, 'abc'}", correct: false }
        ]
    },
    {
        id: 6,
        question: "Sie möchten zwei Spaltenvektoren x und y als zweispaltigen Text in eine Datei schreiben. Welche Vorgehensweise ist richtig?",
        options: [
            { text: "fprintf(fid, '%f %f \\n', [x, y]);", correct: false },
            { text: "fprintf(fid, '%f %f \\n', x, y);", correct: false },
            { text: "fprintf(fid, '%f %f \\n', [x, y]');", correct: true },
            { text: "fprintf(fid, '%f %f \\n', [x; y]);", correct: false }
        ]
    },
    {
        id: 7,
        question: "Handle-Klassen: <code>K1 = Konto(1234); K2 = K1; clear K1;</code> Was passiert?",
        options: [
            { text: "Das Objekt wird gelöscht.", correct: false },
            { text: "Das Objekt ist weiterhin über K2 sichtbar.", correct: true },
            { text: "Alle Handles werden gelöscht.", correct: false },
            { text: "K2 wird ungültig.", correct: false }
        ]
    },
    {
        id: 8,
        question: "Wozu dient die Funktion <code>uialert</code> in einer MATLAB-App?",
        options: [
            { text: "Zum Speichern einer Datei", correct: false },
            { text: "Zur Abfrage einer Benutzereingabe", correct: false },
            { text: "Zur Anzeige einer Meldung für den Benutzer", correct: true },
            { text: "Zum Öffnen einer Datei", correct: false }
        ]
    },
    {
        id: 9,
        question: "Wann wird die Startup-Funktion einer MATLAB-App ausgeführt?",
        options: [
            { text: "Genau einmal beim Starten der App", correct: true },
            { text: "Bei jeder Änderung einer Komponente", correct: false },
            { text: "Bei jedem Button-Klick", correct: false },
            { text: "Beim Öffnen im Editor", correct: false }
        ]
    },
    {
        id: 10,
        question: "Wie greift man in einer App mit Namen 'plotapp' auf eine Komponente 'Button1' zu (innerhalb eines Callbacks)?",
        options: [
            { text: "Button1", correct: false },
            { text: "plotapp.Button1", correct: false },
            { text: "app.Button1", correct: true },
            { text: "global Button1", correct: false }
        ]
    },
    {
        id: 11,
        question: "Wie wird eine Klasse in MATLAB definiert?",
        options: [
            { text: "Mit struct", correct: false },
            { text: "Mit function", correct: false },
            { text: "Mit classdef", correct: true },
            { text: "Als script", correct: false }
        ]
    },
    {
        id: 12,
        question: "Was bedeutet <code>\\n</code> im Formatstring?",
        options: [
            { text: "Null", correct: false },
            { text: "Neue Zeile", correct: true },
            { text: "Neue Zahl", correct: false },
            { text: "Nichts, wird ignoriert", correct: false }
        ]
    },
    {
        id: 13,
        question: "Welche Validierung erzwingt eine positive ganze Zahl?",
        options: [
            { text: "mustBeInteger", correct: false },
            { text: "mustBePositive", correct: false },
            { text: "mustBePositive und mustBeInteger zusammen", correct: true },
            { text: "mustBeFinite", correct: false }
        ]
    },
    {
        id: 14,
        question: "Strings zusammensetzen: <code>s1 = \"Hallo\"</code>, <code>s2 = \"Welt\"</code>. Wie fügt man sie mit Leerzeichen zusammen?",
        options: [
            { text: "s = s1 + \" \" + s2", correct: true },
            { text: "s = [s1, \" \", s2]", correct: true },
            { text: "s = {s1, s2}", correct: false },
            { text: "s = s1 + s2", correct: false }
        ],
        note: "In MATLAB (seit 2017a mit String Arrays) funktioniert +, bei char arrays []. Da Anführungszeichen \"\" verwendet wurden (String), ist + korrekt. [ ] erzeugt ein String-Array [\"Hallo\", \" \", \"Welt\"] statt einem String."
    },
    {
        id: 15,
        question: "Was liefert <code>uiconfirm</code> zurück?",
        options: [
            { text: "Einen Wahrheitswert true/false", correct: false },
            { text: "Den Titel des Fensters", correct: false },
            { text: "Den Text oder Namen des gedrückten Buttons", correct: true },
            { text: "Die Nummer des Buttons", correct: false }
        ]
    },
    {
        id: 16,
        question: "Welche Aussage zu Callbacks ist korrekt?",
        options: [
            { text: "Alle Callbacks werden gleichzeitig ausgeführt.", correct: false },
            { text: "Unterschiedliche App-Komponenten können einen gemeinsamen Callback haben.", correct: true },
            { text: "Ein Button hat beliebig viele Callbacks.", correct: false },
            { text: "Callbacks müssen im Command Window stehen.", correct: false }
        ]
    },
    {
        id: 17,
        question: "Was bewirkt das Attribut <code>Access = private</code> bei einer Eigenschaft?",
        options: [
            { text: "Zugriff ist nur innerhalb der eigenen Klasse erlaubt.", correct: true },
            { text: "Zugriff ist von überall erlaubt.", correct: false },
            { text: "Zugriff nur im Command Window.", correct: false },
            { text: "Variable wird gelöscht.", correct: false }
        ]
    },
    {
        id: 18,
        question: "Was macht <code>sprintf</code>?",
        options: [
            { text: "Gibt Text auf dem Bildschirm aus.", correct: false },
            { text: "Schreibt formatierten Text in eine String-Variable.", correct: true },
            { text: "Liest aus einer Datei.", correct: false },
            { text: "Speichert Workspace.", correct: false }
        ]
    },
    {
        id: 19,
        question: "Strukturvariablen: <code>S(1).x = 5; S(2).x = [9,3];</code>. Was ergibt <code>[S.x]</code>?",
        options: [
            { text: "Fehlermeldung (Dimension mismatch bei vertikal)", correct: false },
            { text: "[5, 9, 3] (wenn x Zeilenvektoren sind)", correct: true },
            { text: "Eine 2x2 Matrix", correct: false },
            { text: "Ein Cell Array", correct: false }
        ]
    },
    {
        id: 20,
        question: "Wie benennt man eine App im App Designer korrekt um?",
        options: [
            { text: "Datei im Explorer umbenennen", correct: false },
            { text: "Speichern unter (Save As) im App Designer", correct: true },
            { text: "Fenstertitel ändern", correct: false },
            { text: "Klassennamen im Code manuell ändern", correct: false }
        ]
    }
];
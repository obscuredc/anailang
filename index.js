class Lang {
    constructor(EN, OT) {
        this.EN = EN;
        this.OT = OT;
    }
    wordToEN(word) {
        if(this.EN[this.OT.indexOf(word)] == undefined) {
            return word;
        }
        return this.EN[this.OT.indexOf(word)] + word[word.length-1] == "'" ? "s" : "";
    }
    wordToOT(word) {
        if (this.OT[this.EN.indexOf(word)] == undefined) {
            return word;
        }
        return this.OT[this.EN.indexOf(word)] + word[word.length - 1] == "'" ? "s" : "";
    }
    translateToEN(sentences) {
        sentences = sentences.split(" "); //turn into words
        sentences = this.removeSpecials(sentences); //remove commas, etc
        sentences = sentences.filter(e => e !== "");
        sentences = sentences.filter(e => e !== "\t");
        sentences = sentences.filter(e => e !== "\n");
        for(let word of sentences) {
            word = word.toLowerCase();
        }
        let translated = [];
        for(const word of sentences) {
            translated.push(this.wordToEN(word));
        }
        return translated.join(" ");
    }
    translateToOT(sentences) {
        sentences = sentences.split(" "); //turn into words
        sentences = this.removeSpecials(sentences); //remove commas, etc
        sentences = sentences.filter(e => e !== "");
        sentences = sentences.filter(e => e !== "\t");
        sentences = sentences.filter(e => e !== "\n");
        for (let word of sentences) {
            word = word.toLowerCase();
        }
        let translated = [];
        for (const word of sentences) {
            translated.push(this.wordToOT(word));
        }
        return translated.join(" ");
    }
    removeSpecials(list) {
        return list.map(s => s.replaceAll(/[.,!?]/g, ""));
    }
}

anai = new Lang([], []);

const global = {
    translateToENfromAnai: () => {
        let source = document.getElementById("inlang").value;
        let output = document.getElementById("outlang");

        let translated = anai.translateToEN(source);
        output.innerText = translated;
    },
    translateToAnaifromEN: () => {
        let source = document.getElementById("inlang").value;
        let output = document.getElementById("outlang");

        let translated = anai.translateToOT(source);
        output.innerText = translated;
    },
    readlangf: (urlname) => {
        let xmlhttp;
        xmlhttp = new XMLHttpRequest();
        xmlhttp.open('GET', urlname, false);
        xmlhttp.send();
        let dict = xmlhttp.responseText;

        const lines = dict.split("\n");

        let en = [];
        let ot = [];

        for(const line of lines) {
            en.push(line.split(";")[0]);
            ot.push(line.split(";")[1]);
        }

        anai.EN = en;
        anai.OT = ot;
    }
}

window.onload = () => {
    document.getElementById("inlang").value = "";
    console.log("load")
    global.readlangf("anai.langf")
    console.log("v0-unstable");
}

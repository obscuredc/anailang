class Lang {
    constructor(EN, OT) {
        this.EN = EN;
        this.OT = OT;
    }
    wordToEN(word) {
        if(this.EN[this.OT.indexOf(word)] == undefined) {
            return word;
        }
        return this.EN[this.OT.indexOf(word)];
    }
    wordToOT(word) {
        if (this.OT[this.EN.indexOf(word)] == undefined) {
            return word;
        }
        return this.OT[this.EN.indexOf(word)];
    }
    translateToEN(sentences) {
        sentences = sentences.split(" "); //turn into words
        sentences = this.removeSpecials(sentences); //remove commas, etc
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
        let newlist = [];
        let specials = ".,?!".split("");
        for(const word of list) {
            console.log("prevword: "+word)
            if(specials.includes(word[word.length -1])) {
                newlist.push(word.substr(0, word.length -2))
                console.log("newword: " + word.substr(0, word.length - 2))
            } else {
                newlist.push(word)
                console.log("newword: "+word)
            }
        }
        newlist = newlist.filter(e => e !== "" || e !== "\n" || e !== "\t");
        return newlist;
    }
}

anai = new Lang(["hello", "world", "of", "member"], ["eiwoj", "dzwrol", "ne", "zukat"]);

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
    }
}

document.addEventListener('load', () => {
    document.getElementById("inlang").value = "";
})

class HashMap {
    constructor(initialCapacity=8) {
        this.length = 0;
        this._hashTable = [];
        this._capacity = initialCapacity;
        this._deleted = 0;
    }
    MAX_LOAD_RATIO = 0.5;
    SIZE_RATIO = 3;
    get(key) {
        // findSlot finds the index of the key
        const index = this._findSlot(key);
        if (this._hashTable[index] === undefined) {
            throw new Error('Key error');
        }
        // access the hashtable by index and get the value
        return this._hashTable[index].value;
    }

    set(key, value){
        const loadRatio = (this.length + this._deleted + 1) / this._capacity;
        // hashtable will be resized whenever there isn't anymore room for another item
        if (loadRatio > HashMap.MAX_LOAD_RATIO) {
            this._resize(this._capacity * HashMap.SIZE_RATIO);
        }
        //Find the slot where this key should be in
        const index = this._findSlot(key);

        if(!this._hashTable[index]){
            this.length++;
        }
        this._hashTable[index] = {
            key,
            value,
            DELETED: false
        }; 
    }

    delete(key) {
        const index = this._findSlot(key);
        const slot = this._hashTable[index];
        if (slot === undefined) {
            throw new Error('Key error');
        }
        // change the DELETED key to true, the key will be present in the table with a deleted marker
        // but will be cleared whenever the table is resized
        slot.DELETED = true;
        this.length--;
        this._deleted++;
    }

    _findSlot(key) {
        // get hash of the key
        const hash = HashMap._hashString(key);
        const start = hash % this._capacity;
        // this most likely will be O(1) because start may very well be where the slot is, but at worst it is O(n)
        for (let i=start; i<start + this._capacity; i++) {
            const index = i % this._capacity;
            const slot = this._hashTable[index];
            if (slot === undefined || (slot.key === key && !slot.DELETED)) {
                return index;
            }
        }
    }

    _resize(size) {
        const oldSlots = this._hashTable;
        this._capacity = size;
        // Reset the length - it will get rebuilt as you add the items back
        this.length = 0;
        this._deleted = 0;
        this._hashTable = [];

        for (const slot of oldSlots) {
            if (slot !== undefined && !slot.DELETED) {
                this.set(slot.key, slot.value);
            }
        }
    }

    static _hashString(string) {
        // calculates the hash of a string, then uses modulus to find a slot with a matching key or an empty slot
        let hash = 5381;
        for (let i = 0; i < string.length; i++) {
            //Bitwise left shift with 5 0s - this would be similar to
            //hash*31, 31 being the decent prime number
            //but bit shifting is a faster way to do this
            //tradeoff is understandability
            hash = (hash << 5) + hash + string.charCodeAt(i);
            //converting hash to a 32 bit integer
            hash = hash & hash;
        }
        //making sure hash is unsigned - meaning non-negtive number. 
        return hash >>> 0;
    }
}


function main() {
const lotr = new HashMap;
characters.forEach(char => {
    for (let [key, value] of Object.entries(char)){
        lotr.set(key, value);
        }
    })
console.log(lotr)   
console.log(lotr.get("Maiar"))
}
const characters= [{"Hobbit": "Bilbo"}, {"Hobbit": "Frodo"},
{"Wizard": "Gandalf"}, {"Human": "Aragorn"}, {"Elf": "Legolas"}, {"Maiar": "The Necromancer"},
{"Maiar": "Sauron"}, {"RingBearer": "Gollum"}, {"LadyOfLight": "Galadriel"}, {"HalfElven": "Arwen"},
{"Ent": "Treebeard"}];

// main();

const WhatDoesThisDo = function(){
    let str1 = 'Hello World.';
    let str2 = 'Hello World.';
    let map1 = new HashMap();
    map1.set(str1,10);
    map1.set(str2,20);
    let map2 = new HashMap();
    let str3 = str1;
    let str4 = str2;
    map2.set(str3,20);
    map2.set(str4,10);

    console.log(map1.get(str1));
    console.log(map2.get(str3));
}

function removeDuplicates(string){
    let letters = [];
    for(i = 0; i < string.length; i++){
        if(!letters.includes(string.charAt(i))) {
            letters.push(string.charAt(i))
        }
    }
    const finalWord = letters.join('');
    console.log(finalWord);
}

// removeDuplicates('google')

function anyPalindrome(string){
    let uniqueLetter = []
    let duplicateLetter= []
    for(i=0; i < string.length; i++){
        // if the letter does not occur in the unique letter array, push it in
        if(!uniqueLetter.includes(string.charAt(i))){
            uniqueLetter.push(string.charAt(i))
        }
        // if it already occurs in it, put it in the duplicate letter array
        else if(uniqueLetter.includes(string.charAt(i))){
            duplicateLetter.push(string.charAt(i))
        }
    }
    // filter out the letters that match between the duplicate letter and unique letter to find the true
    // unique letters
    const uniqueLetterOccurance = uniqueLetter.filter(letter => !duplicateLetter.includes(letter))
    console.log(uniqueLetter)
    console.log(duplicateLetter)
    console.log(uniqueLetterOccurance)
    // if the unique letters have more than one, it is not a palindrome
    if (uniqueLetterOccurance.length !== 1){
        console.log('not a palindrome')
        // if there is only one unique letter, it is a palindrome
    } else if ( uniqueLetterOccurance.length === 1){
        console.log('is a palindrome')
    }
}

anyPalindrome("acecarr")


function groupAnagram(arr, matches){
    if(groupAnagram.length === 1){
        console.log(matches)
    }
    // loop thru entire array
    for(i = 1; i < arr.length; i++){
    let test = [];
        // check the first index word and loop through the array, return word that includes the same letters as index 0 
        //loop through index 0 individual STRING
      for(j = 0; j < arr[0].length; j++) {
          //push boolean value into test array
         test.push(arr[i].includes(arr[0].charAt(j)))
    }
    // if there isn't an exact match, don't do anything
    if(test.includes(false)){
        test = [];
    }
      //if there is a match, push the matches into the matches array
    else {
        matches.push(arr[0], arr[i])
        test = [];
    }
    // recursive call for the next index of the array, slice off the index you just did
    groupAnagram(arr.slice(arr[1], arr.length));
}
}

anagram = ['east', 'cars', 'acre', 'arcs', 'teas', 'eats', 'race']
groupAnagram(anagram)
VARIABLES

const x = 1; //variable with permanent value (can no longer be changed)
let y = 2; //normal variable


ARRAYS

const t = [1, -1, 3] //array
var tLenght = t.length;
var t3 = t[2];
t.push[5]; //add item to array
const t2 = t.concat(5); //better design, creates new array.
//loop to print all
t.forEach(value => {
    console.log(value);
})

const m1 = t.map(value = > value *2); //creates new array and uses a parameter to create new items
console.log(m1); //2, 4, 6 is printed

const m2 = t.map(value => '<li>' + value + '</li>')
console.log(m2)  // [ '<li>1</li>', '<li>2</li>', '<li>3</li>' ] is printed

const[first, second, ..rest] = t;
console.log(first, second)//will print first and second elements, meaning 1 and 2
console.log(rest) //will print 3, 4 and 5, rest of the elements


OBJECTS
const object1 = {
    name: 'Lionel Messi',
    age: 37,
    education: 'La masia'
}

const object2 = {
    name: {
        first: 'Dan',
        last: 'Reynolds',
    },
    grades: [2, 3, 4, 5],
    department: 'Art',
}

access by:
console.log(object1.name)
or:
console.log(object1[fieldName])

add by:
object1.address = 'Rosario';
or:
object1['secret number'] = 12341;

FUNCTIONS
const sum = (p1, p2) => {
    return p1 + p2;
}

const result = sum(1,5)

const square = p => p * p;


let a = [
  {
    id: 1,
    name: 'ca map'
  },
  {
    id: 2,
    name: 'ca heo'
  }
];
let b = [
  {
    id: 1,
    name: 'ca map',
    isOpen: true
  },
  {
    id: 2,
    name: 'ca heo',
    isOpen: false
  }
];
let c = a.map((item, i) => {
  return {
    ...item,
    isOpen: b[i].isOpen
  };
});
console.log(c);
/**
 * User
 * username password email fulname
 *
 * UserReplicate
 * username password email fulname
 * true     true     false false
 *
 */

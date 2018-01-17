const prePopulateParams = [
  {
    id: 1,
    question: "Do you have a car?",
    type: "bool"
  },
  {
    id: 2,
    question: "Do you have children?",
    type: "bool"
  },
  {
    id: 3,
    parentId: 1,
    condition: "Equals",
    conditionValue: "Yes",
    question: "Do you ride the bus?",
    type: "bool"
  },
  {
    id: 4,
    parentId: 2,
    condition: "Equals",
    conditionValue: "Yes",
    question: "How many children do you have?",
    type: "number"
  },
  {
    id: 5,
    parentId: 4,
    condition: "Greater Than",
    conditionValue: 1,
    question: "Do your children live with you?",
    type: "bool"
  },
  {
    id: 6,
    parentId: 4,
    condition: "Equals",
    conditionValue: 1,
    question: "Does your child live with you?",
    type: "bool"
  },
  {
    id: 7,
    parentId: 3,
    condition: "Equals",
    conditionValue: "Yes",
    question: "How many times, per week, do you ride the bus?",
    type: "number"
  },
  {
    id: 8,
    question: "Are you married?",
    type: "bool"
  }
];

module.exports = prePopulateParams;

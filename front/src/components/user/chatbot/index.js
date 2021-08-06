import React , {useState , useEffect} from 'react';
import './style.css'
import $ from 'jquery'
import {Link} from 'react-router-dom'
import AOS from 'aos'
import "aos/dist/aos.css"

export default function App4() {

    const arr1 = [
        {
          "specid":0,
          "specializationname":"Otolaryngology"
        },
        {
          "specid":1,
          "specializationname":"Pulmonology"
        },
        {
          "specid":2,
          "specializationname":"Neurologists"
        }
        ,
        {
          "specid":3,
          "specializationname":"Hematology"
        },
        {
            "specid":4,
            "specializationname":"Gastroenterologists"
        },
        {
            "specid":5,
            "specializationname":"Pediatricians"
        },
        {
          "specid":6,
          "specializationname":"Dermatologists"
        }
        
      ]
    const arr2 = [
        {
          "specid":0,
          "diseasename":"Influenza",
          "questions":[
            {
            "questionText": "Do you have a fever?",
            "answerOptions": [
                { "answerText": "yes", "isCorrect": true },
                { "answerText": "no", "isCorrect": false }
            ]
        },
        {
            "questionText": "Do you have chills?",
            "answerOptions": [
                { "answerText": "yes", "isCorrect": true },
                { "answerText": "no", "isCorrect": false }
            ]
        }
              ,
        {
            "questionText": "Do you feel tired?",
            "answerOptions": [
                { "answerText": "yes", "isCorrect": true },
                { "answerText": "no", "isCorrect": false }
            ]
        }
              ,
        {
            "questionText": "Do you suffer from aches?",
            "answerOptions": [
                { "answerText": "yes", "isCorrect": true },
                { "answerText": "no", "isCorrect": false }
            ]
        }
              ,
        {
            "questionText": "Do you cough?",
            "answerOptions": [
                { "answerText": "yes", "isCorrect": true },
                { "answerText": "no", "isCorrect": false }
            ]
        }
              ,
        {
            "questionText": "Do you have runny or stuffy nose?",
            "answerOptions": [
                { "answerText": "yes", "isCorrect": true },
                { "answerText": "no", "isCorrect": false }
            ]
        }
              ,
        {
            "questionText": "Do you have a sore throat?",
            "answerOptions": [
                { "answerText": "yes", "isCorrect": true },
                { "answerText": "no", "isCorrect": false }
            ]
        }
              ,
        {
            "questionText": "Do you have a diarrhea?",
            "answerOptions": [
                { "answerText": "yes", "isCorrect": true },
                { "answerText": "no", "isCorrect": false }
            ]
        }
              ,
        {
            "questionText": "Do you feel like vomiting?",
            "answerOptions": [
                { "answerText": "yes", "isCorrect": true },
                { "answerText": "no", "isCorrect": false }
            ]
        }
        ]
        },
        {
          "specid":0,
          "diseasename":"Mumps",
          "questions":[
            {
            "questionText": "Do you have swollen glands?",
            "answerOptions": [
                { "answerText": "yes", "isCorrect": true },
                { "answerText": "no", "isCorrect": false }
            ]
        },
        {
            "questionText": "Do you have swollen testicles?",
            "answerOptions": [
                { "answerText": "yes", "isCorrect": true },
                { "answerText": "no", "isCorrect": false }
            ]
        }
              ,
        {
            "questionText": "Do you have a fever?",
            "answerOptions": [
                { "answerText": "yes", "isCorrect": true },
                { "answerText": "no", "isCorrect": false }
            ]
        }
              ,
        {
            "questionText": "Do you have a headache?",
            "answerOptions": [
                { "answerText": "yes", "isCorrect": true },
                { "answerText": "no", "isCorrect": false }
            ]
        }
              ,
        {
            "questionText": "Do you have muscle aches?",
            "answerOptions": [
                { "answerText": "yes", "isCorrect": true },
                { "answerText": "no", "isCorrect": false }
            ]
        }
              ,
        {
            "questionText": "Do you feel extra tired?",
            "answerOptions": [
                { "answerText": "yes", "isCorrect": true },
                { "answerText": "no", "isCorrect": false }
            ]
        }
              ,
        {
            "questionText": "Are you feeling like your mouth is really dry?",
            "answerOptions": [
                { "answerText": "yes", "isCorrect": true },
                { "answerText": "no", "isCorrect": false }
            ]
        }
              ,
        {
            "questionText": "Do you feel like vomiting?",
            "answerOptions": [
                { "answerText": "yes", "isCorrect": true },
                { "answerText": "no", "isCorrect": false }
            ]
        }
               ,
        {
            "questionText": "Do you feel a loss of appetite?",
            "answerOptions": [
                { "answerText": "yes", "isCorrect": true },
                { "answerText": "no", "isCorrect": false }
            ]
        }
        ]
        },
        {
          "specid":0,
          "diseasename":"Whooping Cough",
          "questions":[
            {
            "questionText": "Do you gasp while coughing?",
            "answerOptions": [
                { "answerText": "yes", "isCorrect": true },
                { "answerText": "no", "isCorrect": false }
            ]
        },
        {
            "questionText": "Do you have flu-like symptoms?",
            "answerOptions": [
                { "answerText": "yes", "isCorrect": true },
                { "answerText": "no", "isCorrect": false }
            ]
        },
        {
          "questionText": "Do you throw up while coughing?",
          "answerOptions": [
              { "answerText": "yes", "isCorrect": true },
              { "answerText": "no", "isCorrect": false }
          ]
      }
              ,
        {
          "questionText": "Do you feel that you are very tired or exhausted after coughing?",
          "answerOptions": [
              { "answerText": "yes", "isCorrect": true },
              { "answerText": "no", "isCorrect": false }
          ]
      }
              ,
        {
          "questionText": "Do you have a runny nose?",
          "answerOptions": [
              { "answerText": "yes", "isCorrect": true },
              { "answerText": "no", "isCorrect": false }
          ]
      }
              ,
        {
          "questionText": "Do you have a low-grade fever?",
          "answerOptions": [
              { "answerText": "yes", "isCorrect": true },
              { "answerText": "no", "isCorrect": false }
          ]
      }
        ]
        },
          {
            "specid":1,
            "diseasename":"Coronavirus",
            "questions":[
              {
              "questionText": "Do you have difficulty breathing or shortness of breath?",
              "answerOptions": [
                  { "answerText": "yes", "isCorrect": true },
                  { "answerText": "no", "isCorrect": false }
              ]
          }
                ,
        {
          "questionText": "Do you suffer from chest pain or pressure?",
          "answerOptions": [
              { "answerText": "yes", "isCorrect": true },
              { "answerText": "no", "isCorrect": false }
          ]
      }
                ,
        {
          "questionText": "Do you have dry cough?",
          "answerOptions": [
              { "answerText": "yes", "isCorrect": true },
              { "answerText": "no", "isCorrect": false }
          ]
      }
                ,
        {
          "questionText": "Do you feel extra tired?",
          "answerOptions": [
              { "answerText": "yes", "isCorrect": true },
              { "answerText": "no", "isCorrect": false }
          ]
      }
                ,
        {
          "questionText": "Do you have a high fever?",
          "answerOptions": [
              { "answerText": "yes", "isCorrect": true },
              { "answerText": "no", "isCorrect": false }
          ]
      }
                ,
        {
          "questionText": "Do you suffer from loss of taste or smell?",
          "answerOptions": [
              { "answerText": "yes", "isCorrect": true },
              { "answerText": "no", "isCorrect": false }
          ]
      }
                ,
        {
          "questionText": "Do you have a sore throat?",
          "answerOptions": [
              { "answerText": "yes", "isCorrect": true },
              { "answerText": "no", "isCorrect": false }
          ]
      }
                ,
        {
          "questionText": "Do you have a headache?",
          "answerOptions": [
              { "answerText": "yes", "isCorrect": true },
              { "answerText": "no", "isCorrect": false }
          ]
      }
                ,
        {
          "questionText": "Do you have a runny nose?",
          "answerOptions": [
              { "answerText": "yes", "isCorrect": true },
              { "answerText": "no", "isCorrect": false }
          ]
      }
                ,
        {
          "questionText": "Do you have diarrhea?",
          "answerOptions": [
              { "answerText": "yes", "isCorrect": true },
              { "answerText": "no", "isCorrect": false }
          ]
      }
                ,
        {
          "questionText": "Do you have muscle or body aches?",
          "answerOptions": [
              { "answerText": "yes", "isCorrect": true },
              { "answerText": "no", "isCorrect": false }
          ]
      }
                ,
        {
          "questionText": "Do you look pale or have blue-colored skin?",
          "answerOptions": [
              { "answerText": "yes", "isCorrect": true },
              { "answerText": "no", "isCorrect": false }
          ]
      }
          ]
          },
          {
            "specid":1,
            "diseasename":"Diphtheria",
            "questions":[
              {
              "questionText": "Do you have a thick grey-white coating at the back of your throat?",
              "answerOptions": [
                  { "answerText": "yes", "isCorrect": true },
                  { "answerText": "no", "isCorrect": false }
              ]
          },
          {
              "questionText": "Do you have swollen glands in your neck?",
              "answerOptions": [
                  { "answerText": "yes", "isCorrect": true },
                  { "answerText": "no", "isCorrect": false }
              ]
          },
          {
            "questionText": "Do you suffer from difficulty breathing and swallowing?",
            "answerOptions": [
                { "answerText": "yes", "isCorrect": true },
                { "answerText": "no", "isCorrect": false }
            ]
        },
        {
            "questionText": "Do you have a high fever?",
            "answerOptions": [
                { "answerText": "yes", "isCorrect": true },
                { "answerText": "no", "isCorrect": false }
            ]
        },
        {
            "questionText": "Do you have a headache?",
            "answerOptions": [
                { "answerText": "yes", "isCorrect": true },
                { "answerText": "no", "isCorrect": false }
            ]
        }
                ,
        {
            "questionText": "Do you have a sore throat?",
            "answerOptions": [
                { "answerText": "yes", "isCorrect": true },
                { "answerText": "no", "isCorrect": false }
            ]
        }
                ,
        {
            "questionText": "Are you feeling sick all the time?",
            "answerOptions": [
                { "answerText": "yes", "isCorrect": true },
                { "answerText": "no", "isCorrect": false }
            ]
        }
          ]
          },
          {
            "specid":1,
            "diseasename":"Measles",
            "questions":[
              {
              "questionText": "Do you have a rash?",
              "answerOptions": [
                  { "answerText": "yes", "isCorrect": true },
                  { "answerText": "no", "isCorrect": false }
              ]
          },
          {
              "questionText": "Do you feel her sensitive to any lights?",
              "answerOptions": [
                  { "answerText": "yes", "isCorrect": true },
                  { "answerText": "no", "isCorrect": false }
              ]
          }
                ,
          {
              "questionText": "Do you have a cough?",
              "answerOptions": [
                  { "answerText": "yes", "isCorrect": true },
                  { "answerText": "no", "isCorrect": false }
              ]
          }
                ,
          {
              "questionText": "Do you have loss of appetite?",
              "answerOptions": [
                  { "answerText": "yes", "isCorrect": true },
                  { "answerText": "no", "isCorrect": false }
              ]
          }
                ,
          {
              "questionText": "Do you have a diarrhea?",
              "answerOptions": [
                  { "answerText": "yes", "isCorrect": true },
                  { "answerText": "no", "isCorrect": false }
              ]
          }
                ,
          {
              "questionText": "Do you have a high fever?",
              "answerOptions": [
                  { "answerText": "yes", "isCorrect": true },
                  { "answerText": "no", "isCorrect": false }
              ]
          }
                ,
          {
              "questionText": "Do you have runny nose?",
              "answerOptions": [
                  { "answerText": "yes", "isCorrect": true },
                  { "answerText": "no", "isCorrect": false }
              ]
          }
                ,
          {
              "questionText": "Do you have watery eyes?",
              "answerOptions": [
                  { "answerText": "yes", "isCorrect": true },
                  { "answerText": "no", "isCorrect": false }
              ]
          }
          ]
          },
          {
            "specid":1,
            "diseasename":"Respiratory Syncytial Virus",
            "questions":[
              {
              "questionText": "Do you have runny nose?",
              "answerOptions": [
                  { "answerText": "yes", "isCorrect": true },
                  { "answerText": "no", "isCorrect": false }
              ]
          },
          {
              "questionText": "Do you suffer from decrease in appetite?",
              "answerOptions": [
                  { "answerText": "yes", "isCorrect": true },
                  { "answerText": "no", "isCorrect": false }
              ]
          },
          {
            "questionText": "Do you have a hard cough?",
            "answerOptions": [
                { "answerText": "yes", "isCorrect": true },
                { "answerText": "no", "isCorrect": false }
            ]
        },
        {
            "questionText": "Do you have a fever?",
            "answerOptions": [
                { "answerText": "yes", "isCorrect": true },
                { "answerText": "no", "isCorrect": false }
            ]
        },
        {
            "questionText": "Do you suffer from wheezing or shortness of breath?",
            "answerOptions": [
                { "answerText": "yes", "isCorrect": true },
                { "answerText": "no", "isCorrect": false }
            ]
        }
                ,
        {
            "questionText": "Do you have breathing difficulties?",
            "answerOptions": [
                { "answerText": "yes", "isCorrect": true },
                { "answerText": "no", "isCorrect": false }
            ]
        }
                ,
        {
            "questionText": "Are you feeling irritated?",
            "answerOptions": [
                { "answerText": "yes", "isCorrect": true },
                { "answerText": "no", "isCorrect": false }
            ]
        }
                ,
        {
            "questionText": "Do you feel a decrease in activity or overheating?",
            "answerOptions": [
                { "answerText": "yes", "isCorrect": true },
                { "answerText": "no", "isCorrect": false }
            ]
        }
          ]
          },
        {
            "specid":2,
            "diseasename":"Tetanus",
            "questions":[
              {
              "questionText": "Do you have a headache?",
              "answerOptions": [
                  { "answerText": "yes", "isCorrect": true },
                  { "answerText": "no", "isCorrect": false }
              ]
          },
          {
              "questionText": "Are your jaw feels stiff?",
              "answerOptions": [
                  { "answerText": "yes", "isCorrect": true },
                  { "answerText": "no", "isCorrect": false }
              ]
          },
          {
              "questionText": "Do you have a stiff neck?",
              "answerOptions": [
                  { "answerText": "yes", "isCorrect": true },
                  { "answerText": "no", "isCorrect": false }
              ]
          },
          {
              "questionText": "Do you have difficulty in swallowing?",
              "answerOptions": [
                  { "answerText": "yes", "isCorrect": true },
                  { "answerText": "no", "isCorrect": false }
              ]
          },
          {
              "questionText": "Do you have feel hardening of abdominal muscles?",
              "answerOptions": [
                  { "answerText": "yes", "isCorrect": true },
                  { "answerText": "no", "isCorrect": false }
              ]
          },
          {
              "questionText": "Do you suffer from spasms?",
              "answerOptions": [
                  { "answerText": "yes", "isCorrect": true },
                  { "answerText": "no", "isCorrect": false }
              ]
          },
          {
              "questionText": "Are you sweating too much?",
              "answerOptions": [
                  { "answerText": "yes", "isCorrect": true },
                  { "answerText": "no", "isCorrect": false }
              ]
          }
                ,
          {
              "questionText": "Do you have a fever?",
              "answerOptions": [
                  { "answerText": "yes", "isCorrect": true },
                  { "answerText": "no", "isCorrect": false }
              ]
          }
          ]
          },
    
          {
            "specid":2,
            "diseasename":"Polio",
            "questions":[
              {
              "questionText": "Do you have fever?",
              "answerOptions": [
                  { "answerText": "yes", "isCorrect": true },
                  { "answerText": "no", "isCorrect": false }
              ]
          },
          {
              "questionText": "Do you have fatigue?",
              "answerOptions": [
                  { "answerText": "yes", "isCorrect": true },
                  { "answerText": "no", "isCorrect": false }
              ]
          },
          {
              "questionText": "Do you suffer from nausea?",
              "answerOptions": [
                  { "answerText": "yes", "isCorrect": true },
                  { "answerText": "no", "isCorrect": false }
              ]
          },
          {
              "questionText": "Do you have headache?",
              "answerOptions": [
                  { "answerText": "yes", "isCorrect": true },
                  { "answerText": "no", "isCorrect": false }
              ]
          },
          {
              "questionText": "Do you have neck and back stiffness?",
              "answerOptions": [
                  { "answerText": "yes", "isCorrect": true },
                  { "answerText": "no", "isCorrect": false }
              ]
          },
          {
              "questionText": "Do you suffer from limps pain?",
              "answerOptions": [
                  { "answerText": "yes", "isCorrect": true },
                  { "answerText": "no", "isCorrect": false }
              ]
          },
          {
              "questionText": "Do you have flu-like symptoms?",
              "answerOptions": [
                  { "answerText": "yes", "isCorrect": true },
                  { "answerText": "no", "isCorrect": false }
              ]
          }
          ]
          },
    
          {
            "specid":2,
            "diseasename":"Hib Disease ",
            "questions":[
              {
              "questionText": "Are you drooling continuously?",
              "answerOptions": [
                  { "answerText": "yes", "isCorrect": true },
                  { "answerText": "no", "isCorrect": false }
              ]
          },
          {
              "questionText": "Do you have shortness of breath, cough and breathing problems?",
              "answerOptions": [
                  { "answerText": "yes", "isCorrect": true },
                  { "answerText": "no", "isCorrect": false }
              ]
          },
          {
              "questionText": "Do you suffer from seizures or fits?",
              "answerOptions": [
                  { "answerText": "yes", "isCorrect": true },
                  { "answerText": "no", "isCorrect": false }
              ]
          },
          {
              "questionText": "Do you feel sleepy?",
              "answerOptions": [
                  { "answerText": "yes", "isCorrect": true },
                  { "answerText": "no", "isCorrect": false }
              ]
          },
          {
              "questionText": "Do you have a stiff neck?",
              "answerOptions": [
                  { "answerText": "yes", "isCorrect": true },
                  { "answerText": "no", "isCorrect": false }
              ]
          },
          {
              "questionText": "Do you suffer from severe headache?",
              "answerOptions": [
                  { "answerText": "yes", "isCorrect": true },
                  { "answerText": "no", "isCorrect": false }
              ]
          },
          {
              "questionText": "Do you have a fever?",
              "answerOptions": [
                  { "answerText": "yes", "isCorrect": true },
                  { "answerText": "no", "isCorrect": false }
              ]
          },
          {
            "questionText": "Do you feel loss of consciousness?",
            "answerOptions": [
                { "answerText": "yes", "isCorrect": true },
                { "answerText": "no", "isCorrect": false }
            ]
        },
        {
            "questionText": "Do you suffer from joint pain?",
            "answerOptions": [
                { "answerText": "yes", "isCorrect": true },
                { "answerText": "no", "isCorrect": false }
            ]
        },
        {
            "questionText": "Do you have red or tender skin?",
            "answerOptions": [
                { "answerText": "yes", "isCorrect": true },
                { "answerText": "no", "isCorrect": false }
            ]
        },
          ]
          },
        {
          "specid":3,
          "diseasename":"Ebola",
          "questions":[
            {
            "questionText": "Do you have unexplained bleeding or bruising?",
            "answerOptions": [
                { "answerText": "yes", "isCorrect": true },
                { "answerText": "no", "isCorrect": false }
            ]
        },
        {
            "questionText": "Do you suffer from severe headache?",
            "answerOptions": [
                { "answerText": "yes", "isCorrect": true },
                { "answerText": "no", "isCorrect": false }
            ]
        }
              ,
        {
            "questionText": "Do you feel weak for no reason?",
            "answerOptions": [
                { "answerText": "yes", "isCorrect": true },
                { "answerText": "no", "isCorrect": false }
            ]
        }
              ,
        {
            "questionText": "Do you have a high fever?",
            "answerOptions": [
                { "answerText": "yes", "isCorrect": true },
                { "answerText": "no", "isCorrect": false }
            ]
        }
              ,
        {
            "questionText": "Are you vomiting continuously?",
            "answerOptions": [
                { "answerText": "yes", "isCorrect": true },
                { "answerText": "no", "isCorrect": false }
            ]
        }
              ,
        {
            "questionText": "Do you have a diarrhea?",
            "answerOptions": [
                { "answerText": "yes", "isCorrect": true },
                { "answerText": "no", "isCorrect": false }
            ]
        }
              ,
        {
            "questionText": "Do you suffer from stomach pain?",
            "answerOptions": [
                { "answerText": "yes", "isCorrect": true },
                { "answerText": "no", "isCorrect": false }
            ]
        }
              ,
        {
            "questionText": "Do you suffer from muscle pain?",
            "answerOptions": [
                { "answerText": "yes", "isCorrect": true },
                { "answerText": "no", "isCorrect": false }
            ]
        }
              ,
        {
            "questionText": "Do you suffer from loss of appetite?",
            "answerOptions": [
                { "answerText": "yes", "isCorrect": true },
                { "answerText": "no", "isCorrect": false }
            ]
        }
        ]
        },
        {
          "specid":3,
          "diseasename":"Meningococcal Disease",
          "questions":[
            {
            "questionText": "Do you have a rash of red or purple pinprick spots, or larger bruise-like areas?",
            "answerOptions": [
                { "answerText": "yes", "isCorrect": true },
                { "answerText": "no", "isCorrect": false }
            ]
        },
        {
            "questionText": "Do you feel discomfort when you look at bright light?",
            "answerOptions": [
                { "answerText": "yes", "isCorrect": true },
                { "answerText": "no", "isCorrect": false }
            ]
        }
              ,
        {
            "questionText": "Are you feeling very sick?",
            "answerOptions": [
                { "answerText": "yes", "isCorrect": true },
                { "answerText": "no", "isCorrect": false }
            ]
        }
              ,
        {
            "questionText": "Do you suffer from neck stiffness?",
            "answerOptions": [
                { "answerText": "yes", "isCorrect": true },
                { "answerText": "no", "isCorrect": false }
            ]
        }
              ,
        {
            "questionText": "Do you have a fever?",
            "answerOptions": [
                { "answerText": "yes", "isCorrect": true },
                { "answerText": "no", "isCorrect": false }
            ]
        }
              ,
        {
            "questionText": "Do you have a headache?",
            "answerOptions": [
                { "answerText": "yes", "isCorrect": true },
                { "answerText": "no", "isCorrect": false }
            ]
        }
              ,
        {
            "questionText": "Do you have a diarrhea?",
            "answerOptions": [
                { "answerText": "yes", "isCorrect": true },
                { "answerText": "no", "isCorrect": false }
            ]
        }
              ,
        {
            "questionText": "Do you feel like vomiting?",
            "answerOptions": [
                { "answerText": "yes", "isCorrect": true },
                { "answerText": "no", "isCorrect": false }
            ]
        }
        ]
        },
        {
          "specid":3,
          "diseasename":"Pneumococcal Disease",
          "questions":[
            {
            "questionText": "Do you suffer from chest pain?",
            "answerOptions": [
                { "answerText": "yes", "isCorrect": true },
                { "answerText": "no", "isCorrect": false }
            ]
        },
        {
            "questionText": "Do you have fever?",
            "answerOptions": [
                { "answerText": "yes", "isCorrect": true },
                { "answerText": "no", "isCorrect": false }
            ]
        },
        {
          "questionText": "Do you have a hard cough?",
          "answerOptions": [
              { "answerText": "yes", "isCorrect": true },
              { "answerText": "no", "isCorrect": false }
          ]
      }
              ,
        {
          "questionText": "Do you suffer from shortness of breath?",
          "answerOptions": [
              { "answerText": "yes", "isCorrect": true },
              { "answerText": "no", "isCorrect": false }
          ]
      }
              ,
        {
          "questionText": "Do you have stiff neck?",
          "answerOptions": [
              { "answerText": "yes", "isCorrect": true },
              { "answerText": "no", "isCorrect": false }
          ]
      }
              ,
        {
          "questionText": "Do you suffer from mental confusion?",
          "answerOptions": [
              { "answerText": "yes", "isCorrect": true },
              { "answerText": "no", "isCorrect": false }
          ]
      }
              ,
        {
          "questionText": "Do you feel dizzy?",
          "answerOptions": [
              { "answerText": "yes", "isCorrect": true },
              { "answerText": "no", "isCorrect": false }
          ]
      }
              ,
        {
          "questionText": "Is your blood pressure low?",
          "answerOptions": [
              { "answerText": "yes", "isCorrect": true },
              { "answerText": "no", "isCorrect": false }
          ]
      }
        ]
        },
        {
          "specid":3,
          "diseasename":"HIV/AIDS",
          "questions":[
            {
            "questionText": "Did you recently lost some weight rapidly?",
            "answerOptions": [
                { "answerText": "yes", "isCorrect": true },
                { "answerText": "no", "isCorrect": false }
            ]
        },
        {
            "questionText": "Do you have recurring fever?",
            "answerOptions": [
                { "answerText": "yes", "isCorrect": true },
                { "answerText": "no", "isCorrect": false }
            ]
        },
        {
          "questionText": "Do you suffer from extreme and unexplained tiredness?",
          "answerOptions": [
              { "answerText": "yes", "isCorrect": true },
              { "answerText": "no", "isCorrect": false }
          ]
      }
              ,
        {
          "questionText": "Do you have a diarrhea that lasts for more than a week?",
          "answerOptions": [
              { "answerText": "yes", "isCorrect": true },
              { "answerText": "no", "isCorrect": false }
          ]
      }
              ,
        {
          "questionText": "Do you have red, brown, pink, or purplish blotches on or under the skin or inside the mouth, nose, or eyelids?",
          "answerOptions": [
              { "answerText": "yes", "isCorrect": true },
              { "answerText": "no", "isCorrect": false }
          ]
      }
              ,
        {
          "questionText": "Do you suffer from memory loss and depression?",
          "answerOptions": [
              { "answerText": "yes", "isCorrect": true },
              { "answerText": "no", "isCorrect": false }
          ]
      }
              ,
        {
          "questionText": "Do you have Pneumonia?",
          "answerOptions": [
              { "answerText": "yes", "isCorrect": true },
              { "answerText": "no", "isCorrect": false }
          ]
      }
              ,
        {
          "questionText": "Do you suffer from a sore throat?",
          "answerOptions": [
              { "answerText": "yes", "isCorrect": true },
              { "answerText": "no", "isCorrect": false }
          ]
      }
               ,
        {
          "questionText": "Do you have a fever?",
          "answerOptions": [
              { "answerText": "yes", "isCorrect": true },
              { "answerText": "no", "isCorrect": false }
          ]
      }
               ,
        {
          "questionText": "Are you heavily sweeting in the night?",
          "answerOptions": [
              { "answerText": "yes", "isCorrect": true },
              { "answerText": "no", "isCorrect": false }
          ]
      }
        ]
        },
    
          {
            "specid":4,
            "diseasename":"Norovirus",
            "questions":[
              {
              "questionText": "Do you suffer from any abdominal pain?",
              "answerOptions": [
                  { "answerText": "yes", "isCorrect": true },
                  { "answerText": "no", "isCorrect": false }
              ]
          },
          {
              "questionText": "Have you eaten any expired food recently?",
              "answerOptions": [
                  { "answerText": "yes", "isCorrect": true },
                  { "answerText": "no", "isCorrect": false }
              ]
          },
          {
              "questionText": "Do you suffer from nausea?",
              "answerOptions": [
                  { "answerText": "yes", "isCorrect": true },
                  { "answerText": "no", "isCorrect": false }
              ]
          },
          {
              "questionText": "Do you feel like you want to throw up?",
              "answerOptions": [
                  { "answerText": "yes", "isCorrect": true },
                  { "answerText": "no", "isCorrect": false }
              ]
          },
          {
              "questionText": "Do you have diarrhea?",
              "answerOptions": [
                  { "answerText": "yes", "isCorrect": true },
                  { "answerText": "no", "isCorrect": false }
              ]
          },
          {
              "questionText": "Do you have stomach cramping? ",
              "answerOptions": [
                  { "answerText": "yes", "isCorrect": true },
                  { "answerText": "no", "isCorrect": false }
              ]
          },
         
          ]
          },
    
          {
            "specid":4,
            "diseasename":"Rotavirus",
            "questions":[
              {
              "questionText": "Do you have a frequent watery diarrhea?",
              "answerOptions": [
                  { "answerText": "yes", "isCorrect": true },
                  { "answerText": "no", "isCorrect": false }
              ]
          },
          {
              "questionText": "Do you feel like you want to throw up?",
              "answerOptions": [
                  { "answerText": "yes", "isCorrect": true },
                  { "answerText": "no", "isCorrect": false }
              ]
          },
          {
              "questionText": "Do you have a high fever?",
              "answerOptions": [
                  { "answerText": "yes", "isCorrect": true },
                  { "answerText": "no", "isCorrect": false }
              ]
          },
          {
              "questionText": "Do you have upset stomach?",
              "answerOptions": [
                  { "answerText": "yes", "isCorrect": true },
                  { "answerText": "no", "isCorrect": false }
              ]
          },
          {
              "questionText": "Do you have severe fatigue?",
              "answerOptions": [
                  { "answerText": "yes", "isCorrect": true },
                  { "answerText": "no", "isCorrect": false }
              ]
          },
          {
              "questionText": "Are you feeling irritated?",
              "answerOptions": [
                  { "answerText": "yes", "isCorrect": true },
                  { "answerText": "no", "isCorrect": false }
              ]
          },
          {
              "questionText": "Do you feel dehydrated?",
              "answerOptions": [
                  { "answerText": "yes", "isCorrect": true },
                  { "answerText": "no", "isCorrect": false }
              ]
          },
          {
            "questionText": "Do you have abdominal pain?",
            "answerOptions": [
                { "answerText": "yes", "isCorrect": true },
                { "answerText": "no", "isCorrect": false }
            ]
        },
        {
            "questionText": "Is your mouth dry?",
            "answerOptions": [
                { "answerText": "yes", "isCorrect": true },
                { "answerText": "no", "isCorrect": false }
            ]
        },
        {
            "questionText": "Do you have sunken eyes?",
            "answerOptions": [
                { "answerText": "yes", "isCorrect": true },
                { "answerText": "no", "isCorrect": false }
            ]
        },
          ]
          },
        {
          "specid":5,
          "diseasename":"Rubella",
          "questions":[
            {
            "questionText": "Do you have rash on your face or on your body?",
            "answerOptions": [
                { "answerText": "yes", "isCorrect": true },
                { "answerText": "no", "isCorrect": false }
            ]
        },
        {
            "questionText": "Do you have a low-grade fever?",
            "answerOptions": [
                { "answerText": "yes", "isCorrect": true },
                { "answerText": "no", "isCorrect": false }
            ]
        },
        {
            "questionText": "Do you have swollen glands in the neck or behind the ears?",
            "answerOptions": [
                { "answerText": "yes", "isCorrect": true },
                { "answerText": "no", "isCorrect": false }
            ]
        },
        {
            "questionText": "Do you suffer from aching joints?",
            "answerOptions": [
                { "answerText": "yes", "isCorrect": true },
                { "answerText": "no", "isCorrect": false }
            ]
        },
        {
            "questionText": "Do you have headache?",
            "answerOptions": [
                { "answerText": "yes", "isCorrect": true },
                { "answerText": "no", "isCorrect": false }
            ]
        },
        {
            "questionText": "Do you have a pink eye?",
            "answerOptions": [
                { "answerText": "yes", "isCorrect": true },
                { "answerText": "no", "isCorrect": false }
            ]
        },
        {
            "questionText": "Do you suffer from arthritis?",
            "answerOptions": [
                { "answerText": "yes", "isCorrect": true },
                { "answerText": "no", "isCorrect": false }
            ]
        }
        ]
        },
        {
          "specid":6,
          "diseasename":"Shingles",
          "questions":[
            {
            "questionText": "Do you suffer from a painful rash?",
            "answerOptions": [
                { "answerText": "yes", "isCorrect": true },
                { "answerText": "no", "isCorrect": false }
            ]
        },
        {
            "questionText": "Do you fell itchiness on your face or on your body?",
            "answerOptions": [
                { "answerText": "yes", "isCorrect": true },
                { "answerText": "no", "isCorrect": false }
            ]
        },
        {
            "questionText": "Do you have a burning sensation in the eye?",
            "answerOptions": [
                { "answerText": "yes", "isCorrect": true },
                { "answerText": "no", "isCorrect": false }
            ]
        },
        {
            "questionText": "Do you have a fever?",
            "answerOptions": [
                { "answerText": "yes", "isCorrect": true },
                { "answerText": "no", "isCorrect": false }
            ]
        },
        {
            "questionText": "Do you have a headache?",
            "answerOptions": [
                { "answerText": "yes", "isCorrect": true },
                { "answerText": "no", "isCorrect": false }
            ]
        },
        {
            "questionText": "Do you have upset stomach?",
            "answerOptions": [
                { "answerText": "yes", "isCorrect": true },
                { "answerText": "no", "isCorrect": false }
            ]
        },
        {
            "questionText": "Do you suffer from muscle weakness?",
            "answerOptions": [
                { "answerText": "yes", "isCorrect": true },
                { "answerText": "no", "isCorrect": false }
            ]
        },
        {
            "questionText": "Do you suffer from loss of vision or hearing?",
            "answerOptions": [
                { "answerText": "yes", "isCorrect": true },
                { "answerText": "no", "isCorrect": false }
            ]
        },
        {
            "questionText": "Do you have chills?",
            "answerOptions": [
                { "answerText": "yes", "isCorrect": true },
                { "answerText": "no", "isCorrect": false }
            ]
        }
              ,
        {
            "questionText": "Do you have any recent scars?",
            "answerOptions": [
                { "answerText": "yes", "isCorrect": true },
                { "answerText": "no", "isCorrect": false }
            ]
        }
        ]
        }
       
      ]
    
      /*
      const spec = 0;
      const diseaseselected = arr2.filter((arr2,index) => arr2.specid === spec)
    
      console.log(diseaseselected[0].questions)
      */
        
    
        //console.log(questions[0].questions)


        useEffect(()=>{
            AOS.init({
                duration : 1000
            });
        })

        const [currentQuestion, setCurrentQuestion] = useState(0);
      const [currentindex, setcurrentindex] = useState(0);
        const [showScore, setShowScore] = useState(false);
        const [score, setScore] = useState(0);
        const [savearray,setsavearray] = useState([])
        const [array3 , setarray3] = useState([])
    
    
        const [sureconsole, setsureconsole] = useState({
            num : null
        });
    
        //destructure component state
      const {
        num
      } = sureconsole;
    
      //const diseaseselected1 = arr2;
    
      const handlechange = (e) => {
        setsureconsole({
          ...sureconsole,
          [e.target.name] : e.target.value
        })
        //console.log({num})
      }
    
      var s = num;
      const diseaseselected = arr2.filter((arr2,index) => arr2.specid == s);
      //const scores = [];
      var y=0;
    
        const handleAnswerOptionClick = (isCorrect) => {
            if (isCorrect) {
            setScore(score + 1);
            y = score+1;
            array3.push(y)
            console.log("y = ",array3)
            }
            const nextQuestion = currentQuestion + 1;
            if (nextQuestion < diseaseselected[currentindex].questions.length) {
                setCurrentQuestion(nextQuestion);
            } else {
          const nextindex = currentindex+1;
          if(nextindex < diseaseselected.length){
            if(array3[array3.length - 1] == undefined){
              savearray.push({"diseasename":diseaseselected[currentindex].diseasename,"count":0})
            }else{
            savearray.push({"diseasename":diseaseselected[currentindex].diseasename,"count":array3[array3.length - 1]*100/diseaseselected[currentindex].questions.length})
            }
            if(savearray[savearray.length - 1].count == undefined){
                savearray[savearray.length - 1].count = 0
            }
            console.log("score 1 = ",array3);
            setcurrentindex(nextindex)
            //scores[currentindex] = y;
            
            setCurrentQuestion(0)
            setScore(0)
            setarray3([])
          }
          else{
          //scores[currentindex] = y;
          //savearray.push(array3[array3.length - 1])
          if(array3[array3.length - 1] == undefined){
            savearray.push({"diseasename":diseaseselected[currentindex].diseasename,"count":0})
          }else{
          savearray.push({"diseasename":diseaseselected[currentindex].diseasename,"count":array3[array3.length - 1]*100/diseaseselected[currentindex].questions.length})
          }
          if(savearray[savearray.length - 1].count == undefined){
            savearray[savearray.length - 1].count = 0
          }
          console.log("score 2 = ",array3);
          setShowScore(true);
          }
        }
      };
    
      console.log("savearray = ",savearray)
      /* sort array      */
      savearray.sort(function (a, b) {
        return a.count - b.count
    })
    
    var min = savearray[0],
    max = savearray[savearray.length - 1]
    if(max?.count == undefined){
        max = savearray[savearray.length - 2]
    }
    console.log("savearray after sorting = ",savearray)
    console.log("max after sorting = ",max?.count)

    const openChat = () => {
        document.getElementById('chatbox').style.display='block';
        $('.btn-chat').hide();
      }
      const closeChat = () => {
        document.getElementById('chatbox').style.display='none';
        $('.btn-chat').show();
      }

      const hidewelcome = () => {
        document.getElementById('welcome').style.display='none';
        $('.body1').show();
      }

      const selectanother = () => {
        setCurrentQuestion(0);
        setcurrentindex(0);
        setShowScore(false)
        setScore(0)
        setsavearray([])
        setarray3([])
        setsureconsole({
            num : null
        })
      }

    return(
        <div class="container" id="showapp4">
        <button class="btn btn-info btn-chat" type="button" onClick={openChat}>open Chat-Bot</button>
    
        <div class="chatbox" id="chatbox">
        <div className="titlechatbot">
        <img src="../../../robot.jpg" width="50" height="50" style={{borderRadius:'50%',display:'inline-block',marginBottom:'10px'}} />
         <div style={{display:'inline-block'}}>
          <h2 className="titlechatbot">Chat-Bot</h2>
          </div>
          </div>
          <div class="form-container">
            <div style={{width:'300px',height:'300px'}}>
            <div id="welcome">
            <div className="question-text" style={{display:'inline-block'}}>
                welcome to chat with bot ... this chat was programmed to measure what do you suffer from and give you nearly disease which you have to start please click to button below
            </div><br />
            <button style={{display:'block',padding:'5px',marginTop:'2px',width:'50%'}} className="btn btn-info" onClick={hidewelcome}>start</button>
            </div>
            <div className="body1" style={{display:'none'}}>
            {!s ? (
            <div>
                <div>
                <div className="question-text" style={{display:'inline-block'}}>
                <h6 style={{color:'#252d4a'}}>select to start diagnose</h6>
                </div>
                </div>
                {arr1.map((q,i) => {
                    return(
                        <button style={{display:'block',padding:'5px',marginTop:'2px',width:'50%'}} name="num" onClick={handlechange} className="btn btn-primary" value={i}>{q.specializationname}</button>
                    )
                })}
            </div>
            ) : (
		<div className='quiz'>
			{showScore ?
      (
                <div style={{marginTop:'50px'}}>
				<div className="question-text">
                    <h4>result : <span className="res">{max?.count.toFixed(2)}%</span></h4>
                    <h5>the possible disease name : <span className="res"> {max?.diseasename} </span> </h5>
				</div><br />
                <div className="question-text">
                    <h6>to chat with doctor <Link to="/doctors">click here</Link></h6>
				</div>
                </div>
			) : (
				<>
          <div>
                    <div>
					<div className='question-text'>
						<div>{diseaseselected[currentindex].questions[currentQuestion].questionText}</div>
					</div>
                    </div>
					<div className='answer-section'>
						{diseaseselected[currentindex].questions[currentQuestion].answerOptions.map((answerOption) => (
							<button onClick={() => handleAnswerOptionClick(answerOption.isCorrect)} className="btn btn-secondary" style={{display:'block',padding:'5px',marginTop:'10px',width:'50%'}}>{answerOption.answerText}</button>
						))}
					</div>
          </div>
				</>
			)}
		</div>
        )}
        </div>
        </div>
        {s ? (
        <button type="button" onClick={selectanother} className="btn btn-success btn-lg btn-close">select another specialization !</button>
        ) : (
            <p></p>
        )}
            <button type="button" class="btn btn-danger btn-lg btn-close" onClick={closeChat}>Close</button>
          </div>
        </div>
    
      </div>
    
    )

}
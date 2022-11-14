import { Question } from "src/features/quiz/quizTypes"
import { INFLUENCERS } from "./influencers"
import { PROJECTS } from "./projects"

const main = [
  {
    type: 'single',
    label: 'How familiar are you with the Crypto, NFT & web3 markets?',
    options: [
      {
        label: 'Expert',
        key: 'expert',
        nextQuestion: 'invest_tools',
      },
      {
        label: "I've heard a thing or two",
        key: 'thing_or_two',
        nextQuestion: 'invest_tools',
      },
      {
        label: 'Beginner',
        key: 'beginner',
        nextQuestion: 'invested'
      }
    ],
    key: 'level'
  },
  {
    type: 'single',
    label: 'Have you ever invested in Crypto, NFT or web3 project?',
    key: 'invested',
    options: [
      {
        label: 'Yes',
        key: 'yes',
        nextQuestion: 'invest_tools'
      },
      {
        label: "No",
        key: 'no',
        nextQuestion: 'tracking_tools'
      }
    ]
  },
  {
    type: 'multiple',
    label: 'Which tools do you use to invest to Crypto?',
    key: 'invest_tools',
    options: [
      {
        label: 'Coinbase',
        key: 'coinbase',
      },
      {
        label: "Binance",
        key: 'binance',
      },
      {
        label: "Etoro",
        key: 'etoro',

      },{
        label: "Robinhood",
        key: 'robinhood',
 
      },
      {
        label: "Other",
        key: 'other',

      }
    ]
  },
  {
    type: 'single',
    label: 'Do you use any of crypto tracking tools to invest more accurately?',
    key: 'tracking_tools',
    options: [
      {
        label: 'Yes',
        key: 'yes',
        nextQuestion: 'which_tracking_tools'
      },
      {
        label: "No",
        key: 'no',
        nextQuestion: 'info_1'
      }
    ]
  },
  {
    type: 'multiple',
    label: 'Which tools do you use to track crypto insights?',
    key: 'which_tracking_tools',
    options: [
      {
        label: 'Nansen',
        key: 'nansen',
        nextQuestion: 'influencers'
      },
      {
        label: "Reveal",
        key: 'reveal',
        nextQuestion: 'influencers'
      },
      {
        label: "Other",
        key: 'other',
        nextQuestion: 'influencers'
      },
      {
        label: 'Non of these',
        key: 'none',
        nextQuestion: 'influencers'
      },
    ]
  },
  {
    type: "info_1",
    key: "info_1",
    label: ''
  },
  {
    type: 'multiple',
    label: 'Do you already follow any of these influencers?',
    key: 'influencers',
    options: INFLUENCERS
  },
  {
    type: "info",
    key: "info",
    label: ''
  },
  {
    type: 'multiple',
    label: "Tell us what you're interested in",
    key: 'interested',
    options: [
      {
        label: 'Alt coins',
        key: 'alt_coins'
      },
      {
        label: "Stable coins",
        key: 'stable_coins'
      },
      {
        label: "NFT",
        key: 'nft'
      },
      {
        label: "DAO",
        key: 'dao'
      },
      {
        label: "IDO",
        key: 'ido'
      }
    ]
  },
  {
    type: 'single',
    label: "Do you own any of them?",
    key: 'interested',
    options: [
      {
        label: 'Yes',
        key: 'yes'
      },
      {
        label: "No",
        key: 'no'
      },
    ]
  },
  {
    type: 'multiple',
    label: 'Specify what type of projects you already own',
    key: 'projects',
    options: PROJECTS
  },
]

export const quizzes: Record<string, Question[]> = {
  main,
}
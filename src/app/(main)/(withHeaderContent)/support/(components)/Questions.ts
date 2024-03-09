export const QUESTIONS = [
  {
    name: 'General',
    subtitle: 'Create a support ticket',
    fields: [
      {
        name: "reason",
        displayName: "Ticket Reason",
        required: true,
        label: 'Why are you creating this ticket?',
        type: 'TextArea',
        placeholder: 'Please be as specific as possible.'
      }

    ],
    replies: [
      {
        name: 'Resolved',
        color: 'green'
      },
      {
        name: 'Escalated',
        color: '#bf2a2a'
      }
    ]
  },
  {
    name: 'Staff Application',
    subtitle: 'Apply to become Staff',
    fields: [
      {
        name: "age",
        displayName: "Age",
        required: true,
        label: 'How old are you?',
        type: 'Number',
        placeholder: 'You must be at least 15 years old to apply for our staff team.'
      },
      // {
      //     label: 'Please',
      //     type: 'RichText',
      //     placeholder: 'https://pinkcloud.studio/profile/[ign]',
      // },
      {
        name: "discordId",
        displayName: "Discord ID",
        required: true,
        label: 'What is your Discord ID? (You can find this by enabling Developer Mode in Discord User Settings > Advanced, and right clicking your name in a chat, then clicking "Copy ID". This ID will allow us to know who you are on Discord if you change your username or discriminator.)',
        type: 'Number',
        placeholder: 'Example: 98139145'
      },
      {
        name: "hasMic",
        displayName: "Microphone Status",
        required: true,
        label: 'Do you own a functional microphone?',
        type: 'Checkbox',
        placeholder: 'Yes or No',
      },
      {
        name: "timezone",
        displayName: "Timezone",
        required: true,
        label: 'What is your timezone? Do not tell us where you are from in this response. ',
        type: 'ShortText',
        placeholder: 'Example: EST, GMT, GMT-5. '

      },
      {
        name: "spokenLanguages",
        displayName: "Spoken Languages",
        required: true,
        label: 'What languages can you speak? (Besides English)',
        type: 'ShortText',
        placeholder: 'Spanish, Portuguese, Chinese, Mandarin. Choose whatever.',
      },
      {
        name: "vouchers",
        displayName: "Vouchers",
        required: false,
        label: 'Can any staff members currently on the team vouch for you? If yes, then list all of them, and if possible, your past working relationships with them.',
        type: 'TextArea',
        placeholder: 'Let us know of any staff members that can vouch for you, as that can help in the interview process.',
      },
      {
        name: "applicationReason",
        displayName: "Application Reason",
        required: true,
        label: 'What made you decide to apply for MCCade?',
        type: 'TextArea',
        placeholder: 'Please describe why you want to work for MCCade and how you can contribute to the server.'
      },
      {
        name: "skills",
        displayName: "Skills",
        required: true,
        label: 'What skills do you have that you think will benefit our team? What can you bring to the table?',
        type: 'TextArea',
        placeholder: 'Please list what skills you can bring to MCCade.',
      },
      {
        name: "extraNotes",
        displayName: "Extra Notes",
        required: false,
        label: 'Anything else you would like to mention?',
        type: 'TextArea',
        placeholder: 'Please tell us if there is anything else you would like to let us know!'
      }
    ],
    replies: [
      {
        name: 'Accepted',
        color: 'green'
      },
      {
        name: 'Denied',
        color: '#bf2a2a'
      }
    ]
  },
  {
    name: 'Punishment Appeal',
    subtitle: 'Appeal your punishment',
    fields: [
      {
        name: "punishmentContext",
        displayName: "Punishment Context",
        required: true,
        label: 'Where are you punished?',
        type: 'ShortText',
        placeholder: 'Discord or InGame?'
      },
      {
        name: "punishmentReason",
        displayName: "Punishment Reason",
        required: true,
        label: 'What were you punished for?',
        type: 'TextArea',
        placeholder: 'Please include the exact punishment reason',
      },
      {
        name: "punishmentId",
        displayName: "Punishment ID",
        required: true,
        label: 'What is your punishment ID?',
        type: 'ShortText',
        placeholder: 'ID: 432453'
      },
      {
        name: "fairnessConsent",
        displayName: "Fairness Consent",
        required: false,
        label: 'Do you agree that this was a fair punishment?',
        type: 'Checkbox',
        placeholder: 'Yes or No'
      },
      {
        name: "wasRepeated",
        displayName: "Repeat Status",
        required: false,
        label: 'Have you been punished in the same category before? ',
        type: 'Checkbox',
        placeholder: 'Yes or No'
      },
      {
        name: "reasonToRevoke",
        displayName: "Reason to Revoke",
        required: true,
        label: 'Why should we revoke your punishment? ',
        type: 'TextArea',
        placeholder: 'Please provide as much detail as possible.'
      },
      {
        name: "noShareConsent",
        displayName: "No Sharing Consent",
        required: true,
        label: 'Do you agree that you will not be sharing your appeal to other players, and that you would be re-punished if you were caught doing so?',
        type: 'Checkbox',
        placeholder: 'Yes or No'
      },
      {
        name: "noCopyConsent",
        displayName: "No Copying Consent",
        required: true,
        label: 'Do you agree that your appeal was genuinely written and was not copied from other places?',
        type: 'Checkbox',
        placeholder: 'Yes or No'
      },
      {
        name: "noAskConsent",
        displayName: "No Asking Consent",
        required: true,
        label: 'Do you agree that you will not ask staff members to check your appeal and will wait for it to be reviewed?',
        type: 'Checkbox',
        placeholder: 'Yes or No'
      },

    ],
    replies: [
      {
        name: 'Accepted',
        color: 'green'
      },
      {
        name: 'Denied',
        color: '#bf2a2a'
      }
    ]
  },
];

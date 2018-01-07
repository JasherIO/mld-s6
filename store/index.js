import { firebaseMutations, firebaseAction } from 'vuexfire'

export const state = () => ({
  sidebar: false,
  scoreboard: {
    home: {
      alternate: false,
      team: '',
      score: ''
    },
    away: {
      alternate: false,
      team: '',
      score: ''
    },
    league: '',
    week: ''
  },
  caster: {
    left: '',
    right: ''
  }
})

export const mutations = {
  toggleSidebar (state) {
    state.sidebar = !state.sidebar
  },
  ...firebaseMutations
}

export const actions = {
  setScoreboardRef: firebaseAction(({ bindFirebaseRef }, ref) => {
    bindFirebaseRef('scoreboard', ref)
  }),
  setCasterRef: firebaseAction(({ bindFirebaseRef }, ref) => {
    bindFirebaseRef('caster', ref)
  })
}

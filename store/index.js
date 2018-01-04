import { firebaseMutations, firebaseAction } from 'vuexfire'

export const state = () => ({
  sidebar: false,
  scoreboard: null,
  caster: null
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

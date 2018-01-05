<template>
  <div>
    <img alt="Base" src="/Scoreboard/Base.png" />
    <img alt="Logo" src="/Scoreboard/Logo.png" />
    
    <img alt="Ad" :src="adUrl" />

    <img alt="Week" :src="weekUrl" />
    
    <img alt="HomeTeam" :src="homeTeamUrl" />
    <img alt="HomeScore" :src="homeScoreUrl" />

    <img alt="AwayTeam" :src="awayTeamUrl" />
    <img alt="AwayScore" :src="awayScoreUrl" />

    <img alt="Highlight" src="/Scoreboard/Highlight.png" />
  </div>
</template>

<script>
  import Vuex from 'vuex'

  import { db } from '~/services/firebase/index'
  const scoreboardRef = db.ref('/scoreboard')
  const baseUrl = '/Scoreboard'

  export default {
    layout: 'overlay',
    computed: {
      weekUrl: function () {
        const league = this.$store.state.scoreboard.league
        const week = this.$store.state.scoreboard.week

        return `${baseUrl}/${league}/${week}.png`
      },
      homeTeamUrl: function () {
        const team = this.$store.state.scoreboard.home.team
        const clash = this.$store.state.scoreboard.home.alternate ? '2' : '1'

        return `${baseUrl}/Home/${team}${clash}.png`
      },
      homeScoreUrl: function () {
        const score = this.$store.state.scoreboard.home.score
        return `${baseUrl}/Home/Score/${score}.png`
      },
      awayTeamUrl: function () {
        const team = this.$store.state.scoreboard.away.team
        const clash = this.$store.state.scoreboard.away.alternate ? '2' : '1'

        return `${baseUrl}/Away/${team}${clash}.png`
      },
      awayScoreUrl: function () {
        const score = this.$store.state.scoreboard.away.score
        return `${baseUrl}/Away/Score/${score}.png`
      },
      adUrl: function () {
        const ad = this.ads[this.index]
        return `${baseUrl}/Ads/${ad}.png`
      },
      ...Vuex.mapState(['scoreboard'])
    },
    created () {
      this.$store.dispatch('setScoreboardRef', scoreboardRef)
    },
    mounted () {
      setInterval(this.updateIndex, 45000)
    },
    methods: {
      updateIndex () {
        const size = this.ads.length
        this.index = (this.index + 1) % size
      }
    },
    data () {
      return {
        index: 0,
        ads: [
          'Artic',
          'Bawls',
          'Patreon',
          'Store',
          'Twitter'
        ]
      }
    }
  }
</script>

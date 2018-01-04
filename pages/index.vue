<template>
  <v-layout fluid grid-list-md wrap>
    <v-flex xs12 sm4>
      <v-card>
        <v-card-title>
          <h3 class="headline">Scoreboard</h3>
          <v-spacer />
          
          <!-- <v-tooltip top>
            <v-btn flat icon>
              <v-icon>replay</v-icon>
            </v-btn>
            <span>Reset</span>
          </v-tooltip> -->

          <v-tooltip top>
            <a slot="activator" href="/scoreboard">
              <v-icon dark>link</v-icon>
            </a>
            <span>Scoreboard</span>
          </v-tooltip>
        </v-card-title>

        <v-card-text>

          <v-divider />

          <v-subheader>Home</v-subheader>

          <v-layout row>
            <v-flex xs6>
              <v-select
                v-bind:items="teams"
                :value="scoreboard.home.team"
                @change="updateHomeTeam"
                label="Team"
                autocomplete
              ></v-select>
            </v-flex>

            <v-flex offset-xs1 xs5>
              <v-select
                v-bind:items="scores"
                :value="scoreboard.home.score"
                @change="updateHomeScore"
                label="Score"
                autocomplete
              ></v-select>
            </v-flex>
          </v-layout>

          <v-layout row>
            <v-flex>
              <v-switch 
                v-model="homeAlternate"
                label="Clash" 
              ></v-switch>  
            </v-flex>
          </v-layout>

          <v-divider />

          <v-subheader>Away</v-subheader>

          <v-layout row>
            <v-flex xs6>
              <v-select
                v-bind:items="teams"
                :value="scoreboard.away.team"
                @change="updateAwayTeam"
                label="Team"
                autocomplete
              ></v-select>
            </v-flex>

            <v-flex offset-xs1 xs5>
              <v-select
                v-bind:items="scores"
                :value="scoreboard.away.score"
                @change="updateAwayScore"
                label="Score"
                autocomplete
              ></v-select>
            </v-flex>
          </v-layout>

          <v-layout row>
            <v-flex>
              <v-switch 
                v-model="awayAlternate"
                label="Clash" 
              ></v-switch>  
            </v-flex>
          </v-layout>

          <v-subheader>Week</v-subheader>

          <v-layout row>
            <v-flex xs4>
              <v-select
                v-bind:items="leagues"
                :value="scoreboard.league"
                @change="updateLeague"
                label="League"
                autocomplete
              ></v-select>
            </v-flex>

            <v-flex offset-xs1 xs7>
              <v-select
                v-bind:items="weeks"
                :value="scoreboard.week"
                @change="updateWeek"
                label="Week"
                autocomplete
              ></v-select>
            </v-flex>
          </v-layout>

        </v-card-text>
      </v-card>
    </v-flex>

    <v-flex xs12 sm8>
      <iframe src="/scoreboard" />
    </v-flex>
  </v-layout>
</template>

<script>
  import Vuex from 'vuex'

  import { db } from '~/services/firebase/index'
  const scoreboardRef = db.ref('/scoreboard')

  export default {
    computed: {
      homeAlternate: {
        get () {
          return this.$store.state.scoreboard.home.alternate
        },
        set (value) {
          scoreboardRef.child('home').child('alternate').set(value)
        }
      },
      awayAlternate: {
        get () {
          return this.$store.state.scoreboard.away.alternate
        },
        set (value) {
          scoreboardRef.child('away').child('alternate').set(value)
        }
      },
      ...Vuex.mapState(['scoreboard'])
    },
    created () {
      this.$store.dispatch('setScoreboardRef', scoreboardRef)
    },
    methods: {
      updateHomeTeam: (team) => {
        scoreboardRef.child('home').child('team').set(team)
      },
      updateHomeScore: (score) => {
        scoreboardRef.child('home').child('score').set(score)
      },
      updateAwayTeam: (team) => {
        scoreboardRef.child('away').child('team').set(team)
      },
      updateAwayScore: (score) => {
        scoreboardRef.child('away').child('score').set(score)
      },
      updateLeague: (league) => {
        scoreboardRef.child('league').set(league)
      },
      updateWeek: (week) => {
        scoreboardRef.child('week').set(week)
      }
    },
    data () {
      return {
        leagues: [
          'Champion',
          'Platinum'
        ],
        scores: [
          '0',
          '1',
          '2',
          '3',
          '4',
          '5'
        ],
        teams: [
          'Aviators',
          'Bears',
          'Blizzard',
          'Bulls',
          'Comets',
          'Demolition',
          'Dodgers',
          'Ducks',
          'Elite',
          'Flames',
          'Foxes',
          'Hawks',
          'Hurricanes',
          'Jets',
          'Knights',
          'Lightning',
          'Pandas',
          'Pirates',
          'Puffins',
          'Rhinos',
          'Sharks',
          'Spartans',
          'Wizards',
          'Wolves'
        ],
        weeks: [
          '1',
          '2',
          '3',
          '4',
          '5',
          '6',
          '7',
          '8',
          '9',
          '10',
          '11',
          '12',
          '13',
          '14',
          '15',
          '16',
          '17',
          '18'
        ]
      }
    }
  }
</script>

<style>
  iframe {
    width: 100%;
    height: 100%;
  }
</style>

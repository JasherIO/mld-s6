<template>
  <v-layout fluid grid-list-md wrap>
    <v-flex xs12 sm4>
      <v-card>
        <v-card-title>
          <h3 class="headline">Caster</h3>
          <v-spacer />
          
          <v-tooltip top>
            <a slot="activator" href="/caster">
              <v-icon dark>link</v-icon>
            </a>
            <span>Caster</span>
          </v-tooltip>
        </v-card-title>

        <v-card-text>

          <v-layout row>
            <v-flex xs6>
              <v-select
                v-bind:items="casters"
                :value="caster.left"
                @change="updateLeft"
                label="Left"
                autocomplete
              ></v-select>
            </v-flex>

            <v-flex xs6 ml-2>
              <v-select
                v-bind:items="casters"
                :value="caster.right"
                @change="updateRight"
                label="Right"
                autocomplete
              ></v-select>
            </v-flex>
          </v-layout>

        </v-card-text>
      </v-card>
    </v-flex>

    <v-flex xs12 sm8>
      <iframe src="/caster" />
    </v-flex>
  </v-layout>
</template>

<script>
  import Vuex from 'vuex'

  import { db } from '~/services/firebase/index'
  const casterRef = db.ref('/caster')

  export default {
    computed: {
      ...Vuex.mapState(['caster'])
    },
    created () {
      this.$store.dispatch('setCasterRef', casterRef)
    },
    methods: {
      updateLeft: (name) => {
        casterRef.child('left').set(name)
      },
      updateRight: (name) => {
        casterRef.child('right').set(name)
      }
    },
    data () {
      return {
        casters: [
          'Achieves',
          'ChimBlade',
          'InanimateJ',
          'Kend0',
          'Stax'
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

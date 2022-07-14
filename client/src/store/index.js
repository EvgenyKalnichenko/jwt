// Create a new store instance.
import { readonly } from 'vue'
import user from './user'

const store = readonly({
  user
})

export {
  store
}

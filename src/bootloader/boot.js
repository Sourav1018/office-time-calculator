let app = null
const bootFunctions = []

export const boot = {
  initialize(vueApp) {
    app = vueApp
    bootFunctions.forEach(fn => fn({ app }))
    return app
  },

  register(bootFn) {
    bootFunctions.push(bootFn)
    return this
  },

  load() {
    // Auto-import all files in the boot directory
    const bootModules = import.meta.glob('@/boot/**/*.js', { eager: true })

    Object.values(bootModules).forEach(module => {
      if (module.default) {
        this.register(module.default)
      }
    })
    return this
  }
}

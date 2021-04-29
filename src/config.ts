interface IConfig {
  campaigns: {
    [key: string] : {
      name: string;
      title: string;
      description: string;
    }
  }
}

export default {
  campaigns: {
    'bosques': {
      name: 'Bosques',
      title: 'Greenpeace sos vos',
      description: 'Sumate antes de que el daño por desmontes e incendios generen una destrucción irreversible en los bosques',
      image: 'bosques.jpg',
    },
    'clima-y-energia': {
      name: 'Clima y energía',
      title: 'Greenpeace sos vos',
      description: 'Sumate y en conjunto evitemos que la temperatura de nuestro planeta siga aumentando: hay alternativas',
      image: 'clima-y-energia.jpg',
    },
    'contaminacion': {
      name: 'Contaminación',
      title: 'Greenpeace sos vos',
      description: 'Sumate antes de que sea muy tarde para salvar a nuestro planeta de los daños causados por acciones humanas',
      image: 'contaminacion.jpg',
    },
    'oceanos': {
      name: 'Océanos',
      title: 'Greenpeace sos vos',
      description: 'Sumate para cuidar el agua, evitar que se extingan más especies, y devolver la paz a los océanos',
      image: 'oceanos.jpg',
    },
  },
} as IConfig;

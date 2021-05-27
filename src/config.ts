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
    'delta-del-parana': {
      name: 'Delta del Paraná',
      title: 'El mayor pico de incendios de los últimos 9 años',
      description: 'En el Delta del Paraná, importante humedal que abarca 17.500 km2 y cubre a las provincias de Entre Ríos, Santa Fe y Buenos Aires, persisten los incendios. Estos, además de generar daños graves en el ecosistema y en la flora y fauna autóctona, impactan directamente en la salud, sobre todo de  las comunidades aledañas: los valores de contaminación en el aire superan más de 5 a 6 veces lo admitido por ley. Sumate como socio/a y ayudanos a seguir trabajando para lograr que se penalicen las quemas y se introduzca nuevamente la figura de delito penal en el proyecto de Ley de Humedales.',
      image: 'delta.jpg',
    },
  },
} as IConfig;

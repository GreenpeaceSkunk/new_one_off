import React, { memo, useMemo } from 'react';
import {RouteComponentProps, withRouter } from 'react-router-dom';
// import {Wrapper, SocialMediaWrapper} from './styles';
import Wrapper, { H1, P, Span, Button } from '@bit/meema.ui-components.elements'
import {FacebookLogo, InstagramLogo, TwitterLogo} from '../../../assets/images';

interface MatchParams {};
interface IProps extends RouteComponentProps<MatchParams> {};

const ThankYou: React.FunctionComponent<IProps> = ({
  match,
}) => {
  return useMemo(() => (
    <Wrapper>
      <H1>¡Gracias por apoyar nuestra causa!</H1>
      <P>
        Nuestro trabajo se basa en los principios de mantener absoluta independencia política y económica.
        Ante cualquier duda o consulta llamanos al 011-4551-8811 de lunes a viernes de 10 a 18 Hs.
        O bien escribinos a la casilla exclusiva para socios de Greenpeace socios@infogreenpeace.org.ar
      </P>
    </Wrapper>
  ), [
    match,
  ]);
}

export default memo(withRouter(ThankYou));


// <Wrapper>
//       DONÁ A GREENPEACE PARA DEFENDER EL MEDIOAMBIENTE
//       ¡GRACIAS POR HACER TU APORTE A GREENPEACE Y SUMARTE COMO DONANTE!
//       Te invitamos a seguir nuestras redes para conocer todas las novedades:

//       <SocialMediaWrapper>
//         <img src={FacebookLogo} alt='Facebook'/>
//         <img src={InstagramLogo} alt='Instagram'/>
//         <img src={TwitterLogo} alt='Twitter'/>
//       </SocialMediaWrapper>

//       <H1>¡Gracias por apoyar nuestra causa!</H1>
//       <P>
//         Nuestro trabajo se basa en los principios de mantener absoluta independencia política y económica.
//         Ante cualquier duda o consulta llamanos al 011-4551-8811 de lunes a viernes de 10 a 18 Hs.
//         O bien escribinos a la casilla exclusiva para socios de Greenpeace socios@infogreenpeace.org.ar
//       </P>
//     </Wrapper>
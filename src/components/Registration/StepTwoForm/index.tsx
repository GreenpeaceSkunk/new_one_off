import React, { memo, useContext, useMemo } from 'react';
import { css } from 'styled-components';
import { Wrapper } from '@bit/meema.ui-components.elements';
import { Input, Select, FormWrapperStep, FormLabel } from '../Shared';
import { RegistrationContext } from '../../../routes/Registration/context';

const StepOneForm: React.FunctionComponent<{}> = () => {
  const {
    data: {
      creditCard,
      citizenId,
      donationFor,
    },
    onChange,
  } = useContext(RegistrationContext);

  return useMemo(() => (
    <FormWrapperStep>
      <FormLabel>Datos de pago</FormLabel>
      <Wrapper>
        <label htmlFor="creditCard" />
        <Input type='string' name='creditCard' maxLength={16} value={creditCard} placeholder='Número de tarjeta' onChange={onChange} />
        <label htmlFor="citizenId" />
        <Input type='string' name='citizenId' maxLength={8} value={citizenId} placeholder='DNI' onChange={onChange} />
      </Wrapper>
      <Wrapper
        customCss={css`
          display: flex;
          flex-direction: column;
        `}
      >
        <FormLabel>¿A qué fin te gustaría que destinemos tu donación?</FormLabel>
        <Wrapper>
          <label htmlFor="donationFor" />
          <Select
            name='donationFor'
            value={donationFor}
            onChange={onChange}
          >
            <option>Seleccione una opción</option>
            <option>Clima, energía y contaminación</option>
            <option>Océanos, bosques y mares</option>
            <option>Animales y su medio ambiente</option>
            <option>Otros fines</option>
          </Select>
        </Wrapper>
      </Wrapper>
    </FormWrapperStep>
  ), [
    creditCard,
    citizenId,
    donationFor,
    onChange,
  ]);
}

export default memo(StepOneForm);
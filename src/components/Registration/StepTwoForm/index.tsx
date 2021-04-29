import React, { memo, useContext, useMemo } from 'react';
import { Wrapper } from '@bit/meema.ui-components.elements';
import { Input, FormWrapperStep, FormLabel } from '../Shared';
import { RegistrationContext } from '../context';

const StepOneForm: React.FunctionComponent<{}> = () => {
  const {
    data: {
      creditCardNumber,
      dni,
    },
    onChange,
  } = useContext(RegistrationContext);

  return useMemo(() => (
    <FormWrapperStep>
      <FormLabel>Datos de pago</FormLabel>
      <Wrapper>
        <label htmlFor="creditCardNumber" />
        <Input type='string' name='creditCardNumber' maxLength={16} value={creditCardNumber} placeholder='Número de tarjeta' onChange={onChange} />
        <label htmlFor="dni" />
        <Input type='string' name='dni' maxLength={8} value={dni} placeholder='DNI' onChange={onChange} />
      </Wrapper>
      {/* <Wrapper
        customCss={css`
          display: flex;
          flex-direction: column;
        `}
      >
        <FormLabel>¿A qué fin te gustaría que destinemos tu donación?</FormLabel>
        <Wrapper>
          <label htmlFor="campania" />
          <Select
            disabled={true}
            name='campania'
            value={campania}
            onChange={onChange}
          >
            <option>Seleccione una opción</option>
            <option value='energia-y-contaminacion'>Clima, energía y contaminación</option>
            <option value='oceanos'>Océanos, bosques y mares</option>
            <option value='animales'>Animales y su medio ambiente</option>
            <option>Otros fines</option>
          </Select>
        </Wrapper>
      </Wrapper> */}
    </FormWrapperStep>
  ), [
    creditCardNumber,
    dni,
    onChange,
  ]);
}

export default memo(StepOneForm);
import React, { memo, useContext, useEffect, useMemo, useState } from 'react';
import { Input, FormWrapperStep, FormLabel, FormGroup, Select } from '../Shared';
import { RegistrationContext } from '../../../routes/Registration/context';
import { css } from 'styled-components';
import Wrapper from '@bit/meema.ui-components.elements';

const StepOneForm: React.FunctionComponent<{}> = () => {
  const {
    data: {
      cod_area,
      email,
      nombre,
      apellido,
      otherAmount,
      telefono,
      monto,
    },
    onChange,
  } = useContext(RegistrationContext);

  const [ disabledOtherAmount, setDisabledOtherAmount ] = useState<boolean>(true);

  useEffect(() => {
    const isDefaultAmount = (
      monto === '399'
      || monto === '699'
      || monto === '1999'
      || monto === '2999'
    ) as boolean; 
    setDisabledOtherAmount(isDefaultAmount);
  }, [
    monto,
  ]);

  return useMemo(() => (
    <FormWrapperStep>
      <FormLabel>Elegí con cuánto querés ayudar al planeta:</FormLabel>
      <FormGroup
        customCss={css`
          justify-content: space-between;
        `}
      >
        <Wrapper
          customCss={css`
            width: 40%;
          `}
        >
          <label htmlFor="monto" />
          <Select
            name='monto'
            value={monto}
            onChange={onChange}
          >
            <option value='399'>$399</option>
            <option value='699'>$699</option>
            <option value='1999'>$1999</option>
            <option value='2999'>$2999</option>
            <option value='otherAmount'>Otro importe</option>
          </Select>
        </Wrapper>

        <Wrapper
          customCss={css`
            width: 55%;
          `}
        >
          <label htmlFor="otherAmount" />
          <Input
            disabled={disabledOtherAmount} 
            type='number'
            name='otherAmount'
            value={otherAmount}
            placeholder='Ingrese el monto'
            onChange={onChange}
          />
        </Wrapper>
      </FormGroup>

      <FormGroup>
        <label htmlFor="email" />
        <Input type='email' name='email' value={email} placeholder='Email' onChange={onChange} />
      </FormGroup>
      
      <FormGroup>
        <label htmlFor="nombre" />
        <Input type='text' name='nombre' value={nombre} placeholder='Nombre' onChange={onChange} />
      </FormGroup>
      
      <FormGroup>
        <label htmlFor="apellido" />
        <Input type='text' name='apellido' value={apellido} placeholder='Apellido' onChange={onChange} />
      </FormGroup>

      <FormGroup
        customCss={css`
          justify-content: space-between;
        `}
      >
        <Wrapper
          customCss={css`
            width: 30%;
          `}
        >
          <label htmlFor="cod_area" />
          <Input
            type='text'
            name='cod_area'
            value={cod_area}
            placeholder='Cód Área'
            onChange={onChange}
          />
        </Wrapper>
        <Wrapper
          customCss={css`
            width: 65%;
          `}
        >
          <label htmlFor="telefono" />
          <Input
            type='number'
            name='telefono'
            value={telefono}
            placeholder='Telefono'
            onChange={onChange}
          />
        </Wrapper>
      </FormGroup>
    </FormWrapperStep>
  ), [
    cod_area,
    email,
    nombre,
    apellido,
    otherAmount,
    telefono,
    monto,
    disabledOtherAmount,
    onChange,
  ]);
}

export default memo(StepOneForm);
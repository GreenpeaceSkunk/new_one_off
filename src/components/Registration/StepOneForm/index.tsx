import React, { memo, useContext, useEffect, useMemo, useState } from 'react';
import { Input, FormWrapperStep, FormLabel, FormGroup, Select } from '../Shared';
import { RegistrationContext } from '../context';
import { css } from 'styled-components';
import { Label, Wrapper } from '@bit/meema.ui-components.elements';

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
    defaultAmounts,
    onChange,
  } = useContext(RegistrationContext);
  const [ disabledOtherAmount, setDisabledOtherAmount ] = useState<boolean>(true);

  useEffect(() => {
    setDisabledOtherAmount(defaultAmounts.filter((amount: string) => amount === monto).length ? true : false);
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
          <Label htmlFor="monto" />
          <Select
            name='monto'
            value={monto}
            onChange={onChange}
          >
            {(defaultAmounts).map((value: string, key: number) => (
              <option key={key} value={value}>${value}</option>
            ))}
            <option value='otherAmount'>Otro importe</option>
          </Select>
        </Wrapper>

        <Wrapper
          customCss={css`
            width: 55%;
          `}
        >
          <Label htmlFor="otherAmount" />
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
        <Label htmlFor="email" />
        <Input type='email' name='email' value={email} placeholder='Email' onChange={onChange} />
      </FormGroup>
      
      <FormGroup>
        <Label htmlFor="nombre" />
        <Input type='text' name='nombre' value={nombre} placeholder='Nombre' onChange={onChange} />
      </FormGroup>
      
      <FormGroup>
        <Label htmlFor="apellido" />
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
          <Label htmlFor="cod_area" />
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
          <Label htmlFor="telefono" />
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
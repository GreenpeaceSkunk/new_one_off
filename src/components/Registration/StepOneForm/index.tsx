import React, { memo, useContext, useEffect, useMemo, useState } from 'react';
import { Input, FormWrapperStep, FormLabel, FormGroup, Select } from '../Shared';
import { RegistrationContext } from '../../../routes/Registration/context';
import { css } from 'styled-components';
import Wrapper from '@bit/meema.ui-components.elements';

const StepOneForm: React.FunctionComponent<{}> = () => {
  const {
    data: {
      areaCode,
      email,
      firstName,
      lastName,
      otherAmount,
      phoneNumber,
      totalAmount,
    },
    onChange,
  } = useContext(RegistrationContext);

  const [ disabledOtherAmount, setDisabledOtherAmount ] = useState<boolean>(true);

  useEffect(() => {
    const isDefaultAmount = (
      totalAmount === '399'
      || totalAmount === '699'
      || totalAmount === '1999'
      || totalAmount === '2999'
    ) as boolean; 
    setDisabledOtherAmount(isDefaultAmount);
  }, [
    totalAmount,
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
          <label htmlFor="totalAmount" />
          <Select
            name='totalAmount'
            value={totalAmount}
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
        <label htmlFor="firstName" />
        <Input type='text' name='firstName' value={firstName} placeholder='Nombre' onChange={onChange} />
      </FormGroup>
      
      <FormGroup>
        <label htmlFor="lastName" />
        <Input type='text' name='lastName' value={lastName} placeholder='Apellido' onChange={onChange} />
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
          <label htmlFor="areaCode" />
          <Input
            type='text'
            name='areaCode'
            value={areaCode}
            placeholder='Cód Área'
            onChange={onChange}
          />
        </Wrapper>
        <Wrapper
          customCss={css`
            width: 65%;
          `}
        >
          <label htmlFor="phoneNumber" />
          <Input
            type='number'
            name='phoneNumber'
            value={phoneNumber}
            placeholder='Telefono'
            onChange={onChange}
          />
        </Wrapper>
      </FormGroup>
    </FormWrapperStep>
  ), [
    areaCode,
    email,
    firstName,
    lastName,
    otherAmount,
    phoneNumber,
    totalAmount,
    disabledOtherAmount,
    onChange,
  ]);
}

export default memo(StepOneForm);
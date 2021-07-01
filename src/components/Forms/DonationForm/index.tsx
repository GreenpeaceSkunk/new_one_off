import React, { memo, useContext, useMemo, useCallback, } from 'react';
import { Wrapper } from '@bit/meema.ui-components.elements';
import { Input, FormWrapperStep, FormLabel } from '../Shared';
import { FormContext } from '../context';
import { OnChangeEvent } from '../../../types';

const StepOneForm: React.FunctionComponent<{}> = () => {
  const {
    data: {
      user: {
        dni,
      },
      donation: {
        creditCardNumber,
      },
    },
    // onChange,
    dispatch,
  } = useContext(FormContext);

  const onChange = useCallback((evt: OnChangeEvent) => {
    evt.preventDefault();
    // dispatch({
    //   type: 'UPDATE_USER_DATA',
    //   payload: { [evt.currentTarget.name]: evt.currentTarget.value }
    // });
  }, [
    dispatch,
  ]);

  return useMemo(() => (
    <FormWrapperStep>
      <FormLabel>Datos de pago</FormLabel>
      <Wrapper>
        <label htmlFor="creditCardNumber" />
        <Input type='string' name='creditCardNumber' maxLength={16} value={creditCardNumber} placeholder='Número de tarjeta' onChange={onChange} />
        <label htmlFor="dni" />
        <Input type='string' name='dni' maxLength={8} value={dni} placeholder='DNI' onChange={onChange} />
      </Wrapper>
    </FormWrapperStep>
  ), [
    creditCardNumber,
    dni,
    onChange,
    dispatch,
  ]);
}

export default memo(StepOneForm);
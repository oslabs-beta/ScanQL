import React from 'react';
import * as Form from '@radix-ui/react-form';
import useAppStore from '../../store/appStore';

const FormField: React.FC = () => {

  const { uri, queryString, setQuery, sendCustomQuery} = useAppStore();

  const handleFormSubmit = (event: React.FormEvent) => {
    // prevent the form from submitting and refreshing the page
    event.preventDefault();
    // send the custom query to the backend
    sendCustomQuery(uri, queryString);
    //clear the query field
    setQuery('');
  };

  return (
    <div className='flex mt-8 pr-6'>
      <Form.Root className="w-[260px] h-full" onSubmit={handleFormSubmit}>
        <Form.Field className="grid mb-[10px]" name="query-input">
          <div className="flex items-baseline justify-between">
            <Form.Label className="text-[15px] font-medium leading-[35px] text-white">
          Query Input
            </Form.Label>
            <Form.Message className="text-[13px] text-white opacity-[0.8]" match="valueMissing">
          Please provide a valid query to test
            </Form.Message>
          </div>
          <Form.Control asChild>
            <textarea
              className="box-border w-full bg-blackA5 h-40 shadow-blackA9 inline-flex appearance-none items-center justify-center rounded-[4px] p-[10px] text-[15px] leading-none text-white shadow-[0_0_0_1px] outline-none hover:shadow-[0_0_0_1px_black] focus:shadow-[0_0_0_2px_black] selection:color-white selection:bg-blackA9 resize-none"
              required
              id="query-string"
              value={queryString}
              onChange={(e) => setQuery(e.target.value)}
            />
          </Form.Control>
        </Form.Field>
        <Form.Submit asChild>
          <button className="box-border w-full text-violet11 shadow-blackA7 hover:bg-mauve3 inline-flex h-[35px] items-center justify-center rounded-[4px] bg-white px-[15px] font-medium leading-none shadow-[0_2px_10px] focus:shadow-[0_0_0_2px] focus:shadow-black focus:outline-none mt-[10px]">
        Submit Query
          </button>
        </Form.Submit>
      </Form.Root>
    </div>
  );
};

export default FormField;
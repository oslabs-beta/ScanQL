import React from 'react';
import * as Form from '@radix-ui/react-form';
import * as Separator from '@radix-ui/react-separator';
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
    <div className='flex pr-6'>
      <Form.Root className="w-[260px] h-full" onSubmit={handleFormSubmit}>
        <Form.Field className="grid mb-[10px]" name="query-input">
          <div className="flex items-baseline justify-between">
            <Form.Label className="text-[25px] font-medium leading-[35px] text-white font-montserrat">
          Custom Query Testing 

          <br></br>

          <Separator.Root className="bg-white data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-px my-[15px]" />
          <br></br>

          <h2 className="text-sm mb-5">Enter the query you would like to test:</h2>
            </Form.Label>
            <Form.Message className="text-[13px] text-white opacity-[0.8]" match="valueMissing">
          Please provide a valid query to test
            </Form.Message>
          </div>
          <Form.Control asChild>
            <textarea
              className="box-border w-full bg-blackA5 h-40 shadow-blackA9 inline-flex appearance-none items-center justify-center rounded-lg p-[10px] text-[15px] leading-none text-white shadow-[0_0_0_1px] outline-none hover:shadow-[0_0_0_1px_black] focus:shadow-[0_0_0_2px_black] selection:color-white selection:bg-blackA9 resize-none"
              required
              id="query-string"
              value={queryString}
              onChange={(e) => setQuery(e.target.value)}
            />
          </Form.Control>
        </Form.Field>
        <Form.Submit asChild>
          <button className="box-border w-full rounded-lg font-normal mr-1 ml-1 bg-indigo-900 bg-opacity-20 text-gray-100  shadow-blackA7 hover:bg-indigo-900 hover:bg-opacity-30 inline-flex h-[35px] items-center justify-center px-[15px] leading-none shadow-[0_2px_10px] focus:shadow-[0_0_0_2px] focus:shadow-black focus:outline-none mt-[10px]">
        Submit Query
          </button>
         
        </Form.Submit>
      </Form.Root>
    </div>
  );
};

export default FormField;
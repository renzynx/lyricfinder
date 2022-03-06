import { Field, Form, Formik, FormikErrors } from "formik";
import router from "next/router";
import { SearchValue } from "../lib/types";

const Search = () => {
  const initialValue: SearchValue = { query: "" };

  return (
    <>
      <div className="flex justify-center mt-14 gap-2">
        <Formik
          initialValues={initialValue}
          onSubmit={(values) => {
            if (!values.query) return;
            router.push(`/results?q=${values.query}`);
          }}
          validate={(value: SearchValue) => {
            let errors: FormikErrors<SearchValue> = {};
            if (!value.query) errors.query = "Required";
            return errors;
          }}
        >
          {() => (
            <Form className="flex-row gap-1 mx-auto lg:hidden md:hidden">
              <Field
                id="query"
                name="query"
                placeholder="Search"
                className="input input-bordered w-60"
              />
              <button className="btn btn-active" type="submit">
                Submit
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
};

export default Search;

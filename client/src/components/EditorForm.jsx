import React, { useState, useEffect, useCallback } from "react"
import {
  Box,
  Button,
  Card,
  CardContent,
  FormGroup,
  TextField,
  Typography,
} from "@material-ui/core"
import { ErrorMessage, Field, Form, Formik } from "formik"

import { API } from "../helpers/api"
import { useAuthToken } from "../context/auth"

const initialValues = {
  owner: null,
  todotitle: "",
  todobody: "",
}

const ErrMessage = (props) => {
  return (
    <div className="errormessage" style={{ color: "red" }}>
      <ErrorMessage {...props} />
    </div>
  )
}

const EditorForm = ({ edited, setEdited }) => {
  const authToken = useAuthToken()
  const [todoValues, setTodoValues] = useState(initialValues)

  const getInitialValues = useCallback(async () => {
    if (edited) {
      const gotResponse = await API(
        { endpoint: `/api/todo/${edited}` },
        authToken
      )
      console.log("Initializing with", gotResponse?.todo || initialValues)
      setTodoValues(gotResponse?.todo || initialValues)
    } else {
      // adding new todo. Where is UserId??
      console.log("Initializing with defaults.")
      setTodoValues(initialValues)
    }
  }, [authToken, edited])

  useEffect(() => {
    getInitialValues()
  }, [getInitialValues])

  console.log("Editor renders:", edited, todoValues)

  return (
    <Card>
      <CardContent>
        <Typography variant="h4">New Account</Typography>

        <Formik
          initialValues={todoValues}
          enableReinitialize={true}
          onSubmit={(values, formikHelpers) => {
            console.log("Will save todo here")
          }}
        >
          {({ values, errors, isSubmitting, isValidating }) => (
            <Form>
              <Box marginBottom={2}>
                <FormGroup>
                  <Field name="todotitle" as={TextField} label="Todo Title" />
                  <div className="errormessage">
                    <ErrMessage name="todotitle" />
                  </div>
                </FormGroup>
              </Box>
              <Box marginBottom={2}>
                <FormGroup>
                  <Field
                    name="todobody"
                    as={TextField}
                    multiline
                    rows={3}
                    rowsMax={10}
                    label="Todo Body"
                  />
                  <ErrMessage name="todobody" />
                </FormGroup>
              </Box>

              <Button type="submit" disabled={isSubmitting || isValidating}>
                Submit
              </Button>
              {/* 
              <pre>{JSON.stringify(errors, null, 4)}</pre>
              <pre>{JSON.stringify(values, null, 4)}</pre>
               */}
            </Form>
          )}
        </Formik>
      </CardContent>
    </Card>
  )
}

export default EditorForm

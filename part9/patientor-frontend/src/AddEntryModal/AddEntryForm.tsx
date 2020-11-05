import React from 'react';
import { Formik, Form, Field } from "formik";
import { EntryType, NewEntry } from "../types";
import { Grid, Button, Divider } from "semantic-ui-react";
import { useStateValue } from "../state";
import { DiagnosisSelection, NumberField, TextField } from "../AddPatientModal/FormField";
import * as Yup from "yup";
  
const ConditionalFields: React.FC<({entryType: EntryType})> = ({ entryType }) => {
    switch (entryType) {
    case EntryType.HealthCheck:
        return (
            <Field
                label="Health Check Rating"
                name="healthCheckRating"
                component={NumberField}
                min={0}
                max={3}
            />
        );
    case EntryType.OccupationalHealthCare:
        return (
            <>
                <Field
                    label="Employer Name"
                    placeholder="Employer Name"
                    name="employerName"
                    component={TextField}
                />  
                <h4>Sick Leave</h4>
                <Field
                    label="Start Date"
                    placeholder="YYYY-MM-DD"
                    name="sickLeave.startDate"
                    component={TextField}
                />
                <Field
                    label="End Date"
                    placeholder="YYYY-MM-DD"
                    name="sickLeave.endDate"
                    component={TextField}
                />
            </>
        );
    case EntryType.Hospital:
        return (
            <>  
                <h4>Discharge</h4>
                <Field
                    label="Date"
                    placeholder="YYYY-MM-DD"
                    name="discharge.dischargeDate"
                    component={TextField}
                />
                <Field
                    label="Criteria"
                    placeholder="Criteria"
                    name="discharge.criteria"
                    component={TextField}
                />
            </>
        );
    default:
        return null;
    }
};

interface EntryProps {
    validationSchema: Yup.ObjectSchema;
    initialValues: NewEntry;
    onSubmit: (values: NewEntry) => void;
    onCancel: () => void;
}

const AddEntryForm: React.FC<EntryProps> = ({ onSubmit, onCancel, initialValues, validationSchema }) => {
    const [{ diagnoses }] = useStateValue();
    
    console.log("Validation schema ", validationSchema.fields);
    
    return (
        <Formik
            initialValues={initialValues}
            enableReinitialize={true}
            onSubmit={onSubmit}
            validationSchema={validationSchema}
        >
            {({ isValid, dirty, setFieldValue, setFieldTouched, values }) => {
                return (
                    <Form className="form ui">
                        <Field
                            label="Description"
                            placeholder="Description"
                            name="description"
                            component={TextField}
                        />           
                        <Field
                            label="Date"
                            placeholder="YYYY-MM-DD"
                            name="date"
                            component={TextField}
                        />
                        <Field
                            label="Specialist"
                            placeholder="Specialist"
                            name="specialist"
                            component={TextField}
                        />
  
                        <DiagnosisSelection
                            setFieldValue={setFieldValue}
                            setFieldTouched={setFieldTouched}
                            diagnoses={Object.values(diagnoses)}
                        />
                        <Divider />
                        <ConditionalFields entryType={values.type} />
                        <Grid>
                            <Grid.Column floated="left" width={5}>
                                <Button type="button" onClick={onCancel} color="red">
                                    Cancel
                                </Button>
                            </Grid.Column>
                            <Grid.Column floated="right" width={5}>
                                <Button
                                    type="submit"
                                    floated="right"
                                    color="green"
                                    disabled={!dirty || !isValid}
                                >
                                    Add
                                </Button>
                            </Grid.Column>
                        </Grid> 
  
                    </Form>
                );
            }}
        </Formik>
    );
};

export default AddEntryForm;

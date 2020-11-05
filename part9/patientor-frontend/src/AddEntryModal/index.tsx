import React, {useState, useCallback} from 'react';
import { Modal, Segment, Dropdown, DropdownProps, Form, Divider } from 'semantic-ui-react';
import AddEntryForm from './AddEntryForm';
import { NewEntry, EntryType } from "../types";
import * as Yup from "yup";

const baseInitialValues = {
    description: "",
    date: "",
    specialist: "",
};
const healthCheckInitValues: NewEntry = {
    ...baseInitialValues,
    type: EntryType.HealthCheck,
    healthCheckRating: 0,
};
const occupationalHealthCareInitValues: NewEntry = {
    ...baseInitialValues,
    type: EntryType.OccupationalHealthCare,
    employerName: "",
    sickLeave: {startDate: "", endDate: ""}
};
const hospitalInitValues: NewEntry = {
    ...baseInitialValues,
    type: EntryType.Hospital,
    discharge: { dischargeDate: "", criteria: ""}
};

const baseSchema = Yup.object().shape({
    description: Yup.string().min(6, "Description too Short!").required("Description is a required field"),
    date: Yup.string().matches(/^\d{4}-(0?[1-9]|1[012])-(0?[1-9]|[12][0-9]|3[01])$/, "Invalid date format YYYY-MM-DD").required("Date is a required field"),
    specialist: Yup.string().min(3, "Specialist too Short!").required("Specialist is a required field"),
    diagnosisCodes: Yup.array().of(Yup.string()),
});
const healthCheckSchemaExtension = Yup.object().shape({
    healthCheckRating: Yup.number().min(0).max(3).required("Rating required"),
});
const occupationalHealthCareSchemaExtension = Yup.object().shape({
    employerName: Yup.string().min(6, "Employers name too Short!").required("Employers name is a required field"),
    sickLeave: Yup.object().shape({
        startDate: Yup.string().matches(/^\d{4}-(0?[1-9]|1[012])-(0?[1-9]|[12][0-9]|3[01])$/, "Invalid date format YYYY-MM-DD"),
        endDate: Yup.string().matches(/^\d{4}-(0?[1-9]|1[012])-(0?[1-9]|[12][0-9]|3[01])$/, "Invalid date format YYYY-MM-DD"),
    })
});
const hospitalSchemaExtension = Yup.object().shape({
    discharge: Yup.object().shape({
        dischargeDate: Yup.string().matches(/^\d{4}-(0?[1-9]|1[012])-(0?[1-9]|[12][0-9]|3[01])$/, "Invalid date format YYYY-MM-DD").required("Discharge date is required"),
        criteria: Yup.string().min(6, "Criteria too Short!").required("Criteria criteria is required")
    })
});
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const merge = (...schemas: any[]) => {
    const [first, ...rest] = schemas;
    const merged = rest.reduce(
        (mergedSchemas, schema) => mergedSchemas.concat(schema),
        first
    );
    return merged;
}; 
const healthCheckSchema = merge(baseSchema, healthCheckSchemaExtension);
const occupationalHealthCareSchema = merge(baseSchema, occupationalHealthCareSchemaExtension);
const hospitalSchema = merge(baseSchema, hospitalSchemaExtension);

const EntryTypeOptions = [
    { key: EntryType.HealthCheck, value: EntryType.HealthCheck, text: "Health Check" },
    { key: EntryType.OccupationalHealthCare, value: EntryType.OccupationalHealthCare, text: "Occupational Health Care" },
    { key: EntryType.Hospital, value: EntryType.Hospital, text: "Hospital" },
];

interface WrapperProps {
    onClose: () => void;
    onSubmit: (values: NewEntry) => void;
}

const AddEntryFormWrapper: React.FC<WrapperProps> = ({ onClose, onSubmit }) => {
    const [entryType, setEntryType] = useState<EntryType>(EntryType.HealthCheck);
    
    const handleChange = (event: React.SyntheticEvent, {value}: DropdownProps) => setEntryType(value as EntryType);
    
    const entryForm = useCallback(() => {
        switch (entryType) {
        case EntryType.HealthCheck:
            return (
                <AddEntryForm
                    initialValues={healthCheckInitValues}
                    validationSchema={healthCheckSchema}
                    onCancel={onClose}
                    onSubmit={onSubmit}
                />
            );
        case EntryType.OccupationalHealthCare:
            return (
                <AddEntryForm
                    initialValues={occupationalHealthCareInitValues}
                    validationSchema={occupationalHealthCareSchema}
                    onCancel={onClose}
                    onSubmit={onSubmit}
                />
            );
        case EntryType.Hospital:
            return (
                <AddEntryForm
                    initialValues={hospitalInitValues}
                    validationSchema={hospitalSchema}
                    onCancel={onClose}
                    onSubmit={onSubmit}
                />
            );
        default:
            return null;
        }
    }, [entryType, onClose, onSubmit]);
  
    return (
        <>
            <Form>
                <Form.Field>
                    <label>Entry Type</label>
                    <Dropdown
                        fluid
                        onChange={handleChange}
                        options={EntryTypeOptions}
                        selection
                        value={entryType}
                    />
                    <Divider />
                </Form.Field>
            </Form>
    
            {entryForm()}
        </>
    );
};

interface Props {
    modalOpen: boolean;
    onClose: () => void;
    onSubmit: (values: NewEntry) => void;
    error?: string;
}

export const AddEntryModal = ({ modalOpen, onClose, onSubmit, error}: Props) => (
    <Modal open={modalOpen} onClose={onClose} centered={false} closeIcon>
        <Modal.Header>Add a new entry</Modal.Header>
        <Modal.Content>
            {error && <Segment inverted color="red">{`Error: ${error}`}</Segment>}
            <AddEntryFormWrapper onClose={onClose} onSubmit={onSubmit} />
        </Modal.Content>
    </Modal>
);

export default AddEntryModal;

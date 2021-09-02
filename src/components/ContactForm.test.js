import React from 'react';
import {render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import ContactForm from './ContactForm';

test('renders without errors', ()=>{
   render(<ContactForm />);
});

test('renders the contact form header', ()=> {
    render(<ContactForm />);
    const header = screen.getByText(/contact form/i);
    expect(header).toBeTruthy();
});

test('renders ONE error message if user enters less then 5 characters into firstname.', async () => {
    render(<ContactForm />);

    const firstName = screen.getByLabelText(/first name/i);
    userEvent.type(firstName, "abcd"); 

    const error = screen.getByTestId("error");   
    expect(error).toBeVisible();
});

test('renders THREE error messages if user enters no values into any fields.', async () => {
    render(<ContactForm />);

    const firstName = screen.getByLabelText(/first name/i);
    const lastName = screen.getByLabelText(/last name/i);
    const email = screen.getByLabelText(/email/i);
    const submitButton = screen.getByRole('button', {name:/submit/i,});

    userEvent.type(firstName, ""); 
    userEvent.type(lastName, ""); 
    userEvent.type(email, ""); 
    userEvent.click(submitButton);

    const error1 = screen.getByText('Error: firstName must have at least 5 characters.');
    const error2 = screen.getByText('Error: lastName is a required field.');
    const error3 = screen.getByText('Error: email must be a valid email address.')

    expect(error1).toBeVisible();
    expect(error2).toBeVisible();
    expect(error3).toBeVisible();
});

test('renders ONE error message if user enters a valid first name and last name but no email.', async () => {
    render(<ContactForm />);

    const firstName = screen.getByLabelText(/first name/i);
    const lastName = screen.getByLabelText(/last name/i);

    userEvent.type(firstName, "Allison"); 
    userEvent.type(lastName, "Homem"); 

    const submitButton = screen.getByRole('button', {name:/submit/i,});
    userEvent.click(submitButton);

    const error = screen.getByTestId("error");   
    expect(error).toBeInTheDocument();
});

test('renders "email must be a valid email address" if an invalid email is entered', async () => {
    render(<ContactForm />);

    const email = screen.getByLabelText(/email/i);

    userEvent.type(email, "blah"); 

    const error = screen.getByText('Error: email must be a valid email address.')

    expect(error).toBeInTheDocument();
});

test('renders "lastName is a required field" if an last name is not entered and the submit button is clicked', async () => {
    render(<ContactForm />);

    const lastName = screen.getByLabelText(/last name/i);
    const submitButton = screen.getByRole('button', {name:/submit/i,});

    userEvent.type(lastName, ""); 
    userEvent.click(submitButton);

    const error = screen.getByText('Error: lastName is a required field.');

    expect(error).toBeVisible();
});

test('renders all firstName, lastName and email text when submitted. Does NOT render message if message is not submitted.', async () => {
    render(<ContactForm />);

    const firstName = screen.getByLabelText(/first name/i);
    const lastName = screen.getByLabelText(/last name/i);
    const email = screen.getByLabelText(/email/i);
    const message = screen.getByLabelText(/message/i);
    const submitButton = screen.getByRole('button', {name:/submit/i,});

    userEvent.type(firstName, "Allison"); 
    userEvent.type(lastName, "Homem"); 
    userEvent.type(email, "mrs.allisonhomem@outlook.com"); 
    userEvent.type(message, "");
    userEvent.click(submitButton);

    const firstDisplay = screen.queryByText("Allison");
    const lastDisplay = screen.queryByText("Homem");
    const emailDisplay = screen.queryByText("mrs.allisonhomem@outlook.com");
    const messageDisplay = screen.queryByTestId("messageDisplay");

    expect(firstDisplay).toBeInTheDocument();
    expect(lastDisplay).toBeInTheDocument();
    expect(emailDisplay).toBeInTheDocument();
    expect(messageDisplay).not.toBeInTheDocument();
    
});

test('renders all fields text when all fields are submitted.', async () => {
    render(<ContactForm />);

    const firstName = screen.getByLabelText(/first name/i);
    const lastName = screen.getByLabelText(/last name/i);
    const email = screen.getByLabelText(/email/i);
    const message = screen.getByLabelText(/message/i);
    const submitButton = screen.getByRole('button', {name:/submit/i,});

    userEvent.type(firstName, "Allison"); 
    userEvent.type(lastName, "Homem"); 
    userEvent.type(email, "mrs.allisonhomem@outlook.com"); 
    userEvent.type(message, "hello");
    userEvent.click(submitButton);

    const firstDisplay = screen.queryByTestId("firstnameDisplay");
    const lastDisplay = screen.queryByTestId("lastnameDisplay");
    const emailDisplay = screen.queryByTestId("emailDisplay");
    const messageDisplay = screen.queryByTestId("messageDisplay");

    expect(firstDisplay).toBeInTheDocument();
    expect(lastDisplay).toBeInTheDocument();
    expect(emailDisplay).toBeInTheDocument();
    expect(messageDisplay).toBeInTheDocument();

});
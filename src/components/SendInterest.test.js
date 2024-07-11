import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import SendInterest from './SendInterest';
import axios from 'axios';

jest.mock('axios');

describe('SendInterest Component', () => {
    test('renders without crashing', () => {
        render(<SendInterest />);
    });

    test('fetches users and displays them', async () => {
        axios.get.mockResolvedValueOnce({ data: [{ id: 1, username: 'testuser' }] });
        render(<SendInterest />);
        const user = await screen.findByText('testuser');
        expect(user).toBeInTheDocument();
    });

    test('sends an interest', async () => {
        axios.post.mockResolvedValueOnce({ status: 201 });
        axios.get.mockResolvedValueOnce({ data: [{ id: 1, username: 'testuser' }] });

        render(<SendInterest />);
        const user = await screen.findByText('testuser');
        fireEvent.click(user);
        fireEvent.change(screen.getByPlaceholderText('Write a message'), { target: { value: 'Hello!' } });
        fireEvent.click(screen.getByText('Send Interest'));

        const successMessage = await screen.findByText('Interest sent successfully!');
        expect(successMessage).toBeInTheDocument();
    });
});

/*
services.ts
description: This file contains the services for customers, using axios to forward requests to the Customer Service
author: Blaise Niyonkuru<blaiseniyonkuru12@gmail.com>
*/

import Customer from "../../models/customer";
import apiClient from '../../utils/axois';
import { CreateCustomerInput } from './types';

export class CustomerService {
  async createCustomer(customerData: CreateCustomerInput['body']) {
    const response = await apiClient.post('/customers', customerData);
    return response.data as Customer;
  }

  async getCustomerById(id: number) {
    const response = await apiClient.get(`/customers/${id}`);
    const customer = response.data as Customer;

    // Remove address-related attributes from the response
    if (response.data) {
      const { address, address2, city, state, zipcode, createdAt, updatedAt, ...sanitizedCustomer } = customer;
      return sanitizedCustomer;
    }

    return response.data;
  }

  async getCustomerByUserId(userId: string) {
    const response = await apiClient.get(`/customers?userId=${userId}`);
    const customer = response.data as Customer;

    // Remove address-related attributes from the response
    if (response.data) {
      const { address, address2, city, state, zipcode, createdAt, updatedAt, ...sanitizedCustomer } = customer;
      return sanitizedCustomer;
    }

    return response.data;
  }
}

export default new CustomerService();
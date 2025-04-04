
export type InvoiceItem = {
  id: string;
  name: string;
  quantity: number;
  price: number;
  total: number;
};

export type CustomerInfo = {
  name: string;
  email: string;
  phone: string;
  address: {
    street: string;
    city: string;
    state: string;
    postalCode: string;
  };
};

export type InvoiceData = {
  id: string;
  customerInfo: CustomerInfo;
  date: Date;
  dueDate: Date;
  items: InvoiceItem[];
  subtotal: number;
  tax: number;
  discount: number;
  total: number;
  status: 'paid' | 'pending' | 'overdue';
  paymentMethod?: string;
  notes?: string;
};

// Generate sample invoice data
export const generateSampleInvoices = (): InvoiceData[] => {
  const customers: CustomerInfo[] = [
    {
      name: "Raj Auto Works",
      email: "info@rajautoworks.com",
      phone: "+91 98765 43210",
      address: {
        street: "123 Automotive Street",
        city: "Mumbai",
        state: "Maharashtra",
        postalCode: "400001"
      }
    },
    {
      name: "Singh Mechanics",
      email: "contact@singhmechanics.in",
      phone: "+91 87654 32109",
      address: {
        street: "45 Service Road",
        city: "Delhi",
        state: "Delhi",
        postalCode: "110001"
      }
    },
    {
      name: "Kumar Vehicles",
      email: "sales@kumarvehicles.com",
      phone: "+91 76543 21098",
      address: {
        street: "789 Parts Avenue",
        city: "Bangalore",
        state: "Karnataka",
        postalCode: "560001"
      }
    },
    {
      name: "Patel Car Service",
      email: "service@patelcars.in",
      phone: "+91 65432 10987",
      address: {
        street: "234 Repair Lane",
        city: "Ahmedabad",
        state: "Gujarat",
        postalCode: "380001"
      }
    },
    {
      name: "Sharma Motors",
      email: "info@sharmamotors.com",
      phone: "+91 54321 09876",
      address: {
        street: "567 Engine Road",
        city: "Jaipur",
        state: "Rajasthan",
        postalCode: "302001"
      }
    },
    {
      name: "Mehta Auto Parts",
      email: "parts@mehtaauto.com",
      phone: "+91 43210 98765",
      address: {
        street: "890 Component Street",
        city: "Chennai",
        state: "Tamil Nadu",
        postalCode: "600001"
      }
    },
    {
      name: "Gupta Garage",
      email: "repairs@guptagarage.in",
      phone: "+91 32109 87654",
      address: {
        street: "321 Workshop Road",
        city: "Kolkata",
        state: "West Bengal",
        postalCode: "700001"
      }
    }
  ];
  
  const autoItems = [
    { name: "Engine Oil Filter", price: 450 },
    { name: "Brake Pads (Front)", price: 1200 },
    { name: "Spark Plugs (Set of 4)", price: 800 },
    { name: "Air Filter", price: 350 },
    { name: "Battery (12V)", price: 4500 },
    { name: "Headlight Bulb (Pair)", price: 600 },
    { name: "Windshield Wiper Blades", price: 750 },
    { name: "Power Steering Fluid", price: 350 },
    { name: "Coolant (1L)", price: 550 },
    { name: "Transmission Fluid", price: 950 },
    { name: "Alternator", price: 6500 },
    { name: "Radiator", price: 3200 },
    { name: "Timing Belt Kit", price: 2800 },
    { name: "Fuel Filter", price: 380 },
    { name: "Oxygen Sensor", price: 1700 },
    { name: "Brake Fluid (500ml)", price: 450 },
    { name: "Engine Oil (5L)", price: 2300 },
    { name: "Shock Absorber", price: 1900 },
    { name: "CV Joint", price: 2250 },
    { name: "Clutch Kit", price: 5500 },
    { name: "Water Pump", price: 1800 },
    { name: "Thermostat", price: 650 },
    { name: "Fan Belt", price: 400 },
    { name: "Car Battery Terminal", price: 250 },
    { name: "Wheel Bearing", price: 950 }
  ];

  const statuses: ('paid' | 'pending' | 'overdue')[] = ['paid', 'pending', 'overdue'];
  const paymentMethods: string[] = ['UPI', 'Credit Card', 'Debit Card', 'Net Banking', 'Cash', 'Cheque'];

  const invoices: InvoiceData[] = [];
  
  // Generate 20 detailed sample invoices
  for (let i = 0; i < 20; i++) {
    const invoiceDate = new Date();
    invoiceDate.setDate(invoiceDate.getDate() - Math.floor(Math.random() * 30)); // Random date within last 30 days
    
    const dueDate = new Date(invoiceDate);
    dueDate.setDate(dueDate.getDate() + 15); // Due in 15 days
    
    const customer = customers[Math.floor(Math.random() * customers.length)];
    const status = statuses[Math.floor(Math.random() * statuses.length)];
    const paymentMethod = status === 'paid' ? paymentMethods[Math.floor(Math.random() * paymentMethods.length)] : undefined;
    
    // Generate 2-5 items for each invoice
    const itemCount = Math.floor(Math.random() * 4) + 2;
    const items: InvoiceItem[] = [];
    
    // Track used items to avoid duplicates in the same invoice
    const usedItemIndices = new Set<number>();
    
    for (let j = 0; j < itemCount; j++) {
      let itemIndex: number;
      do {
        itemIndex = Math.floor(Math.random() * autoItems.length);
      } while (usedItemIndices.has(itemIndex));
      
      usedItemIndices.add(itemIndex);
      
      const item = autoItems[itemIndex];
      const quantity = Math.floor(Math.random() * 5) + 1;
      const price = item.price;
      const total = price * quantity;
      
      items.push({
        id: `ITEM-${i}${j}`,
        name: item.name,
        quantity: quantity,
        price: price,
        total: total
      });
    }
    
    // Calculate invoice totals
    const subtotal = items.reduce((sum, item) => sum + item.total, 0);
    const taxRate = 0.18; // 18% GST
    const tax = Math.round(subtotal * taxRate);
    
    // Random discount between 0-10%
    const discountRate = Math.random() * 0.1;
    const discount = Math.round(subtotal * discountRate);
    
    const total = subtotal + tax - discount;
    
    invoices.push({
      id: `INV-${1000 + i}`,
      customerInfo: customer,
      date: invoiceDate,
      dueDate: dueDate,
      items: items,
      subtotal: subtotal,
      tax: tax,
      discount: discount,
      total: total,
      status: status,
      paymentMethod: paymentMethod,
      notes: Math.random() > 0.7 ? "Customer requested express delivery" : undefined
    });
  }
  
  return invoices;
};

export const sampleInvoices = generateSampleInvoices();

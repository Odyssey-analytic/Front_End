export const signup = async (data: {
    username: string;
    email: string;
    password: string;
    confirm_password: string;
  }) => {
    const response = await fetch('https://odysseyanalytics.ir/api/api/signup/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
  
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Signup failed');
    }
  
    return response.json();
  };
  
  export const login = async (data: { identifier: string; password: string }) => {
    // const response = await fetch('http://localhost:8000/api/login/', {
    const response = await fetch('https://odysseyanalytics.ir/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
  
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Login failed');
    }
  
    return response.json(); 
  };
  
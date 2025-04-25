export const login = async (data: { identifier: string; password: string }) => {
  try {
    const response = await fetch('https://odysseyanalytics.ir/api/api/login/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Login failed with message:', errorData.message);
      throw new Error(errorData.message || 'Login failed');
    }

    const result = await response.json();
    console.log('Login successful:', result);
    return result;
  } catch (error: any) {
    console.error('Network or unexpected error:', error);
    throw new Error('An unexpected error occurred. Please try again.');
  }
};


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
  

  export const getUserStatus = async () => {
    const token = localStorage.getItem('accessToken');
  
    const response = await fetch('https://odysseyanalytics.ir/api/api/user/status/', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });
  
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'خطا در دریافت وضعیت کاربر');
    }
  
    const result = await response.json(); // مثلا { status: true }
    return result;
  };
  


  export const requestPasswordReset = async (data: { email: string }) => {
    console.log("Sending POST to /request-reset-password with:", data.email);
  
    const response = await fetch('https://odysseyanalytics.ir/api/api/request-reset-password/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to send reset email.');
    }
  
    return response.json();
  };


  export const resetPassword = async (data: {
    token: string;
    password: string;
    confirm_password: string;
  }) => {
    const response = await fetch(`https://odysseyanalytics.ir/api/api/reset-password/${data.token}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        password: data.password,
        confirm_password: data.confirm_password
      })
    });
  
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Password reset failed.");
    }
  
    return response.json();
  };
  

  // export const submitGameInfo = async (data: {
  //   name: string;
  //   engine: string;
  //   platform: string;
  //   description?: string;
  // }) => {
  //   const response = await fetch('/api/game/submit', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify(data),
  //   });
  
  //   if (!response.ok) {
  //     const errorData = await response.json();
  //     throw new Error(errorData.message || 'خطا در ارسال اطلاعات بازی.');
  //   }
  
  //   return response.json();
  // };
  

  export const submitGameInfo = async (data: {
    name: string;
    engine: string;
    platform: string;
    description?: string;
  }) => {
    const token = localStorage.getItem('accessToken');
  
    const response = await fetch('/api/game/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });
  
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'خطا در ارسال اطلاعات بازی.');
    }
  
    return response.json();
  };
  


  // export const fetchUserGames = async () => {
  //   const token = localStorage.getItem('accessToken');
  
  //   const response = await fetch('https://odysseyanalytics.ir/api/api/user/games/', {
  //     method: 'GET',
  //     headers: {
  //       'Content-Type': 'application/json',
  //       'Authorization': `Bearer ${token}`,
  //     },
  //   });
  
  //   if (!response.ok) {
  //     const errorData = await response.json();
  //     throw new Error(errorData.message || 'خطا در دریافت بازی‌ها');
  //   }
  
  //   return response.json();
  // };
  
  
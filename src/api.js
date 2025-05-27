const BASE_URL = 'http://localhost:8080'; // 替换为你的后端地址

export const uploadDocument = async (formData) => {
  return fetch(`${BASE_URL}/api/documents`, {
    method: 'POST',
    body: formData,
  });
};

export const queryKnowledge = async (data) => {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 3000000); // ms
  
  try {
    const response = await fetch(`/api/query`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
      signal: controller.signal
    });
    // 检查响应状态
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return response;
  } catch (error) {
    console.error('Fetch error:', error);
    throw error; // 重新抛出错误以便调用方处理
  } finally {
    clearTimeout(timeoutId);
  }
};
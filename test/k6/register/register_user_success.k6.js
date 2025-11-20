import http from 'k6/http';
import { check, sleep } from 'k6';
import { BASE_URL } from '../base_url.js';

export const options = {
  vus: 30, // 30 usuários simultâneos
  duration: '60s',
  thresholds: {
    http_req_duration: ['p(95)<200'], // 95% das requisições devem responder em até 200ms
  },
  //iterations: 1,
};

export default function () {
  // __VU: número do usuário virtual, __ITER: iteração do usuário
  const uniqueId = `${__VU}_${__ITER}_${Date.now()}`;
  const payload = JSON.stringify({
    name: `Usuário K6 ${uniqueId}`,
    email: `k6user_${uniqueId}@test.com`,
    password: 'SenhaForte123',
    phone: '11999999999'
  });

  const params = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const res = http.post(`${BASE_URL}/api/owners/register`, payload, params);

  check(res, {
    'status é 201': (r) => r.status === 201,
    'resposta contém id': (r) => r.json('id') !== undefined,
  });

  sleep(1);
}

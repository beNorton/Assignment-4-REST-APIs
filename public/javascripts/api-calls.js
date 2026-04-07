const testApiButton = document.getElementById('test-api-button');

async function logJsonResponse(label, response) {
  const contentType = response.headers.get('content-type') || '';
  let body = null;

  if (contentType.includes('application/json')) {
    body = await response.json();
  } else if (response.status !== 204) {
    body = await response.text();
  }

  console.log(label, {
    status: response.status,
    ok: response.ok,
    body,
  });

  return body;
}

async function testMealsApi() {
  console.clear();
  console.log('Starting API tests for /api/meals');

  try {
    const listResponse = await fetch('/api/meals');
    await logJsonResponse('LIST /api/meals', listResponse);

    const createPayload = {
      mealname: `API Test Meal ${new Date().toISOString()}`,
      plateImageURL: 'https://example.com/api-test-meal.jpg',
      description: 'first item\nsecond item',
    };

    const createResponse = await fetch('/api/meals', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(createPayload),
    });
    const createdMeal = await logJsonResponse('CREATE POST /api/meals', createResponse);

    if (!createResponse.ok || !createdMeal?._id) {
      console.error('Stopping API test run because create did not return a meal id.');
      return;
    }

    const mealId = createdMeal._id;

    const findResponse = await fetch(`/api/meals/${mealId}`);
    await logJsonResponse(`FIND GET /api/meals/${mealId}`, findResponse);

    const updatePayload = {
      mealname: `${createPayload.mealname} Updated`,
      plateImageURL: 'https://example.com/api-test-meal-updated.jpg',
      description: 'updated item one\nupdated item two',
    };

    const updateResponse = await fetch(`/api/meals/${mealId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatePayload),
    });
    await logJsonResponse(`UPDATE PUT /api/meals/${mealId}`, updateResponse);

    const deleteResponse = await fetch(`/api/meals/${mealId}`, {
      method: 'DELETE',
    });
    await logJsonResponse(`DELETE /api/meals/${mealId}`, deleteResponse);

    const finalListResponse = await fetch('/api/meals');
    await logJsonResponse('LIST /api/meals after delete', finalListResponse);

    console.log('API test run complete.');
  } catch (error) {
    console.error('API test run failed:', error);
  }
}

if (testApiButton) {
  testApiButton.addEventListener('click', testMealsApi);
}

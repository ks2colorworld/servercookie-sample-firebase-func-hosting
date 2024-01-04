<script>
  import { writable } from 'svelte/store';
  import axios from 'axios';

  let responseData = writable('');

	const localUrl = 'http://127.0.0.1:5001/ks-server-client2/us-central1';
	const funcUrl = 'https://us-central1-ks-server-client2.cloudfunctions.net';

  const fetchData = async (url, message, withCredentials=false) => {
    try {

			// HTTP GET 요청
			// const response = await fetch(url, {
			//   method: 'GET',
			//   credentials: 'include',
			// });
			
      // 응답값을 JSON 형식으로 파싱
      // const data = await response.json(); // fetch

			const response = 
				withCredentials? 
					await axios.get(url, { withCredentials: true }):
					await axios.get(url);
					// await axios.get(url, { withCredentials: true });
			// console.log(response);

      // 응답값을 JSON 형식으로 파싱
			const data = response.data; // axios

      // 응답값을 변수에 할당
      responseData.update(prev => `${message}\n${JSON.stringify(data, null, 2)}\n${prev}`);
    } catch (error) {
      console.error('에러 발생:', error);
      responseData.update(prev => `${message}\n에러가 발생했습니다.\n\n${prev}`);
    }
  };

  const fetchDataPost = async (url, username, message, withData=false, withCredentials=false) => {
    try {
      const reqData = JSON.stringify({
        data: {
          username,
        },
      });
			const reqDataWithCredentials = {
			  method: 'POST',
			  credentials: 'include',
				body:reqData,
			}
			const reqDataWithoutCredentials = {
			  method: 'POST',
				body:reqData,
			}

			// HTTP POST 요청
			// const response = await fetch(url, {
			//   method: 'POST',
			//   credentials: 'include',
			// 	body:reqData,
			// });
			const response = await fetch(url, withCredentials? reqDataWithCredentials:reqDataWithoutCredentials)

      // 응답값을 JSON 형식으로 파싱
      const data = await response.json(); // fetch

      // const response = withCredentials?
			// 	await axios.post(url, { //withData?reqData:null, { 
			// 		// method:'post',
			// 		withCredentials: true,
			// 		// "Content-type": "application/json",
			// 	}):
			// 	await axios.post(url, { //withData?reqData:null, { 
			// 		// headers: { "Content-Type": `application/json`}
			// 		// method:'post',
			// 		// withCredentials: true,
			// 		// "Content-Type": "application/json",
			// 	});

      // // 응답값을 JSON 형식으로 파싱
			// const data = response.data; // axios

      // 응답값을 변수에 할당
      responseData.update(prev => `${message}\n${JSON.stringify(data, null, 2)}\n\n${prev}`);
    } catch (error) {
      console.error('에러 발생:', error);
      responseData.update(prev => `${message}\n에러가 발생했습니다.\n\n${prev}`);
    }
  };
</script>
<style>
  #main {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
  }

  #button_group1 {
    flex: 1;
    margin-right: 16px; /* 조절 가능한 마진 값 */
  }
  #button_group2 {
    flex: 1;
    margin-right: 16px; /* 조절 가능한 마진 값 */
  }

</style>
<main>
	<div id='main'>
  <div id='button_group1'>
	<h3>{localUrl}/helloWorld get (kslee1)</h3>
  <p>
		<button on:click={() => fetchData(localUrl+'/helloWorld?username=kslee1', '/helloworld get',false)}>/helloworld get</button>
  </p>
	<h3>{localUrl}/helloWorld get withCredentials (kslee2)</h3>
	<p>
		<button on:click={() => fetchData(localUrl+'/helloWorld?username=kslee2', '/helloworld get withCredentials', true)}>/helloworld get withCredentials</button>
	</p>
	<hr>
	<h3>{funcUrl}/helloWorld get (kslee1)</h3>
  <p>
		<button on:click={() => fetchData(funcUrl+'/helloWorld?username=kslee1', '/helloworld get')}>/helloworld get</button>
  </p>
  <h3>{funcUrl}/helloWorld get withCredentials (kslee2)</h3>
  <p>
		<button on:click={() => fetchData(funcUrl+'/helloWorld?username=kslee2', '/helloworld get withCredentials', true)}>/helloworld get withCredentials</button>
  </p>
	</div>
	<hr> 
  <div id='button_group2'>
	<h3>{localUrl}/helloWorld post (mikeyLee1)</h3>
  <p>
		<button on:click={() => fetchDataPost(localUrl+'/helloWorld', 'mikeyLee1', '/helloworld post',true, false)}>/helloworld post</button>
  </p>
	<h3>{localUrl}/helloWorld post withCredentials (mikeyLee2)</h3>
	<p>
		<button on:click={() => fetchDataPost(localUrl+'/helloWorld', 'mikeyLee2', '/helloworld post withCredentials', true, true)}>/helloworld post withCredentials</button>
	</p>
	<hr>
	<h3>{funcUrl}/helloWorld post (mikeyLee1)</h3>
  <p>
		<button on:click={() => fetchDataPost(funcUrl+'/helloWorld', 'mikeyLee1', '/helloworld post',true, false)}>/helloworld post</button>
  </p>
	<h3>{funcUrl}/helloWorld post withCredentials (mikeyLee2)</h3>
	<p>
		<button on:click={() => fetchDataPost(funcUrl+'/helloWorld', 'mikeyLee2', '/helloworld post withCredentials', true, true)}>/helloworld post withCredentials</button>
	</p>



	<!-- 
	<h3>{localUrl}/helloWorld post withCredentials -no data</h3>
  <p>
		<button on:click={() => fetchDataPost(localUrl+'/helloWorld', 'mikeyLee', '/helloworld post withCredentials', false, true)}>/helloworld post withCredentials</button>
  </p>
	<hr>
  <h3>https://127.0.0.1:3001/3 post (username=ks2lee)</h3>
  <p>
    <button on:click={() => fetchDataPost('https://127.0.0.1:3001/3', 'ks2lee', '응답값4')}>POST 요청 (쿠키설정) - 응답값4</button>
  </p>
  <p>
    <button on:click={() => fetchData('http://127.0.0.1:3000/2', '응답값5')}>GET 요청 (쿠키확인) - 응답값5</button>
  </p> 
	-->
</div>
<hr>
</div>
	<div>
		<pre >{$responseData}</pre>
	</div>
</main>

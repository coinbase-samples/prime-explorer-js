<script>
  /**
   * Copyright 2022 Coinbase Global, Inc.
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *  http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */

  import 'carbon-components-svelte/css/white.css';
  import Nav from '../Nav.svelte';
  import UsersList from '../UI/UsersList.svelte';
  import { Content } from 'carbon-components-svelte';
</script>

<Nav />
<Content class="Layout">
  <div>
    <a class="buy-with-crypto"
      href="https://commerce.coinbase.com/checkout/a5b2403c-94e4-446a-9f1b-822e2b4a8e42">
      Buy with Crypto
    </a>
    <script src="https://commerce.coinbase.com/v1/checkout.js?version=201807">
    </script>
  </div>
  <UsersList />
</Content>

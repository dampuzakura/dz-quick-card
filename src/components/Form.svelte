<script lang="ts">
  import Fieldset from './Fieldset.svelte';
  import { type FormData, emptyFiles } from './form.ts';
  import { drawCard, downloadCard } from './card.ts';

  let avatarInput: HTMLInputElement;
  let clearAvatar = () => {
    formData.avatar = emptyFiles;
    avatarInput.files = emptyFiles;
  };
  let formData: FormData = {
    orientation: 'landscape',
    name: {
      text: '',
      fontSize: 200,
    },
    furigana: {
      text: '',
      fontSize: 150,
    },
    introduction: {
      text: '',
      fontSize: 150,
    },
    avatar: emptyFiles,
    yourcolor: '#6F51A1',
    company: '',
    position: '',
    email: '',
    phone: '',
    address: '',
    website: '',
    twitter: '',
    fediverse: '',
    facebook: '',
    instagram: '',
  };

  $: drawCard(formData);
</script>

<section>
  <h2>情報を入力</h2>
  <form on:submit|preventDefault>
    <Fieldset title="名刺の向き">
      <label>
        <input
          type="radio"
          name="orientation"
          value="landscape"
          bind:group={formData.orientation}
        />
        横向き
      </label>
      <label>
        <input
          type="radio"
          name="orientation"
          value="portrait"
          bind:group={formData.orientation}
        />
        縦向き
      </label>
    </Fieldset>
    <Fieldset title="名前">
      <label>
        <input type="text" bind:value={formData.name.text} />
      </label>
      <label>
        フォントサイズ
        <input
          type="range"
          min="100"
          max="400"
          bind:value={formData.name.fontSize}
        />
        {formData.name.fontSize}px
      </label>
    </Fieldset>
    <Fieldset title="フリガナ">
      <label>
        <input type="text" bind:value={formData.furigana.text} />
      </label>
      <label>
        フォントサイズ
        <input
          type="range"
          min="100"
          max="350"
          bind:value={formData.furigana.fontSize}
        />
        {formData.furigana.fontSize}px
      </label>
    </Fieldset>
    <Fieldset title="自己紹介">
      <label>
        <input type="text" bind:value={formData.introduction.text} />
      </label>
      <label>
        フォントサイズ
        <input
          type="range"
          min="100"
          max="350"
          bind:value={formData.introduction.fontSize}
        />
        {formData.introduction.fontSize}px
      </label>
    </Fieldset>
    <Fieldset title="アバター">
      <label>
        <input
          type="file"
          bind:files={formData.avatar}
          bind:this={avatarInput}
        />
        <button type="button" on:click={clearAvatar}>選択解除</button>
      </label>
    </Fieldset>
    <Fieldset title="カラー">
      <label>
        <input type="color" bind:value={formData.yourcolor} />
      </label>
    </Fieldset>
    <Fieldset title="会社">
      <label>
        <input type="text" bind:value={formData.company} />
      </label>
    </Fieldset>
    <Fieldset title="役職">
      <label>
        <input type="text" bind:value={formData.position} />
      </label>
    </Fieldset>
    <Fieldset title="メール">
      <label>
        <input type="email" bind:value={formData.email} />
      </label>
    </Fieldset>
    <Fieldset title="電話">
      <label>
        <input type="tel" bind:value={formData.phone} />
      </label>
    </Fieldset>
    <Fieldset title="住所">
      <label>
        <input type="text" bind:value={formData.address} />
      </label>
    </Fieldset>
    <Fieldset title="ウェブサイト">
      <small>QRコードになります</small>
      <label>
        <input type="url" bind:value={formData.website} />
      </label>
    </Fieldset>
    <Fieldset title="X">
      <label>
        <input type="text" bind:value={formData.twitter} />
      </label>
    </Fieldset>
    <Fieldset title="Fediverse">
      <label>
        <input type="text" bind:value={formData.fediverse} />
      </label>
    </Fieldset>
    <Fieldset title="Facebook">
      <label>
        <input type="text" bind:value={formData.facebook} />
      </label>
    </Fieldset>
    <Fieldset title="Instagram">
      <label>
        <input type="text" bind:value={formData.instagram} />
      </label>
    </Fieldset>
  </form>
</section>
<section>
  <h2>名刺のプレビュー</h2>
  <div id="card"></div>
</section>
<section>
  <h2>名刺を保存</h2>
  <button on:click={downloadCard}>ダウンロード</button>
</section>

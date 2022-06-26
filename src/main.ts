'use script';

interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

interface Posts {
  userId: number;
  posts: Post[];
}

const link: string = 'https://jsonplaceholder.typicode.com/posts';

async function request(url: string): Promise<Post[] | string> {
  try {
    const result = await fetch(url);
    const json = await result.json();

    return json;
  } catch (error) {
    if (error instanceof Error) {
      return error.message;
    } else {
      return 'Unexpected error';
    }
  }
}

function getPosts(action: CallableFunction) {
  request(link)
    .then((users) => action(users))
    .catch((error) => handleError(error));
}

function handleError(message: string) {
  window.alert(message);
}

const postsList = document.querySelector('.posts__list');
let form;
let buttonUpdate;

function initialRender(data: Post[]) {
  let users: Posts[] = [];

  data.map((value) => {
    if (users.find((user) => user.userId === value.userId)) {
      users.find((user) => user.userId === value.userId)?.posts.push(value);
    } else {
      users.push({
        userId: value.userId,
        posts: [value],
      });
    }
  });

  render(users);
  addListeners(users);
}

function render(users: Posts[]) {
  for (let userPosts of users) {
    postsList?.insertAdjacentHTML(
      'beforeend',
      `
      <li class="posts__post-user-${userPosts.userId} user-item"><b>User #${userPosts.userId}</b></li>
    `
    );

    for (let post of userPosts.posts) {
      let postUser = document.querySelector(
        `.posts__post-user-${userPosts.userId}`
      );

      postUser?.insertAdjacentHTML(
        'beforeend',
        `
      <ul class="post__content">
      <li class="post__title-${post.id}">Title: ${post.title}</li>
      <li class="post__body-${post.id}">${post.body}</li>
    </ul>
    <form class="posts__update-post" name="addPost-${post.id}" >
      <input type="text" name="input" placeholder="Enter update" class="posts__enter-value"/>
      <button type="button" name="add-title-${post.id}" class="button__update">Update title</button>
      <button type="button" name="add-body-${post.id}" class="button__update">Update post</button>
    </form>
      `
      );
    }
  }
}

function addListeners(users: Posts[]) {
  buttonUpdate = document.querySelectorAll('.button__update');

  buttonUpdate.forEach((button) => {
    button.addEventListener('click', (event) => {
      const id = +(event?.target as HTMLButtonElement).name.replace(
        /[^0-9]/g,
        ''
      );
      const form = document.forms.namedItem(`addPost-${id}`);
      const formValue = document.forms
        .namedItem(`addPost-${id}`)
        ?.elements.namedItem('input') as HTMLFormElement;

      const input = formValue.value;
      const buttonTitle = (event?.target as HTMLButtonElement).name.split(
        '-'
      )[1];

      if (!input) {
        window.alert('Please, enter your updates');
      } else {
        updateObjectInArray(users, id, buttonTitle as keyof Post, {
          [buttonTitle]: input,
        });

        form?.reset();
      }
    });
  });
}

function updateObjectInArray(
  data: Posts[],
  key: number,
  value: keyof Post,
  patch: Partial<Post>
) {
  const itemToUpdate = document.querySelector(`.post__${value}-${key}`);

  data.map((item) =>
    item.posts.map((post) => {
      if (post.id === key) {
        (post[value] as string) = patch[value as keyof Post] as string;
      }
    })
  );

  itemToUpdate!.textContent =
    value === 'title'
      ? (itemToUpdate!.textContent = `Title: ${
          patch[value as keyof Post] as string
        }`)
      : (itemToUpdate!.textContent = patch[value as keyof Post] as string);
}

getPosts(initialRender);

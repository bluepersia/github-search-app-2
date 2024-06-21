
let darkMode = false;

document.querySelector ('.cmp__theme-toggle').addEventListener ('click', toggleTheme);
const themeText = document.querySelector ('.cmp__theme-toggle__text');
const themeIcon = document.querySelector ('.cmp__theme-toggle__img');

const mainEl = document.querySelector ('.cmp__main');
const imgProfile = document.querySelector ('.cmp__img-profile');
const nameEl = document.querySelector ('.cmp__name');
const nickEl = document.querySelector ('.cmp__nickname');
const dateEl = document.querySelector ('.cmp__date');
const bioEl = document.querySelector ('.cmp__bio');
const reposEl = document.querySelector ('.cmp__repos');
const followersEl = document.querySelector ('.cmp__followers');
const followingEl = document.querySelector ('.cmp__following');
const locationEl = document.querySelector ('.cmp__location');
const websiteEl = document.querySelector ('.cmp__website');
const twitterEl = document.querySelector ('.cmp__twitter');
const companyEl = document.querySelector ('.cmp__company');

document.querySelector ('.cmp__search-form').addEventListener ('submit', submit);

function toggleTheme ()
{
    darkMode = !darkMode;

    document.body.classList.remove ('dark');

    if (darkMode)
        document.body.classList.add ('dark');

    themeText.textContent = darkMode ? 'Light' : 'Dark';
    themeIcon.src =`./assets/icon-${darkMode ? 'sun' : 'moon'}.svg`;
}


function submit (e)
{
    e.preventDefault ();

    const formData = new FormData (e.target);

    fetchAndRender (formData.get ('name'));
}


async function fetchAndRender (name)
{
    const res = await fetch (`https://api.github.com/users/${name}`);

    if (!res.ok)
        throw new Error ((await res.json()).message || res.statusText);

    const data = await res.json();

    mainEl.classList.remove ('cmp__main--inactive');

    imgProfile.src = data.avatar_url;
    nameEl.textContent = data.name;
    nickEl.textContent = `@${data.login}`;
    dateEl.textContent = `Joined ${new Date (data.created_at).toLocaleString ('en-us', {month:"short", day:"numeric", year:"numeric"})}`;
    bioEl.textContent = data.bio || 'This profile has no bio';
    reposEl.textContent = data.public_repos;
    followersEl.textContent = data.followers;
    followingEl.textContent = data.following;
    locationEl.textContent = data.location || 'Not Available';
    websiteEl.textContent = data.blog || 'Not Available';
    twitterEl.textContent = data.twitter_username || 'Not Available';
    companyEl.textContent = data.company || 'Not Available';

    checkDetail (locationEl);
    checkDetail (websiteEl);
    checkDetail (twitterEl);
    checkDetail (companyEl);

}

function checkDetail (el)
{
    el.parentElement.classList.remove ('cmp__detail--unavailable');

    if (el.textContent === 'Not Available')
        el.parentElement.classList.add ('cmp__detail--unavailable');
}
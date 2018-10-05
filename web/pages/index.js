import Link from 'next/link';

export default () => <>
  <ul>
    <li>
      <Link prefetch href="/add">
        <a>Add page</a>
      </Link>
    </li>
    <li>
      <Link prefetch href="/list">
        <a>List page</a>
      </Link>
    </li>
  </ul>
</>;

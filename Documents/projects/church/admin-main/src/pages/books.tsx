function Books() {
  const books = Array(10).fill(null).map((_, i) => ({
    title: `Book ${i + 1}`,
    date: `2024-09-${(i % 30) + 1}`,
    times: `${9 + (i % 10)}:30 AM`
  }));

  return (
      <div className="w-[calc(100vw-16rem)]">
        <PageHeader
            title="Books"
            addButtonLabel="Add new book"
        />
        <Table
            data={books}
            columns={[
              { key: 'title', header: 'Book Title' },
              { key: 'date', header: 'Release Date' },
              { key: 'times', header: 'Launch Time' }
            ]}
        />
      </div>
  );
}

export default Books;
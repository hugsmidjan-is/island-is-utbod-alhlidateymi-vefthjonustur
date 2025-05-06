-- National registry data
INSERT INTO
  public.th_address (id, address, postal_code, city)
VALUES
  (
    'a963b5d1-b450-4612-ab10-8db38c9cbf06',
    'Bláfjallagata 12',
    '105',
    'Reykjavík'
  );

INSERT INTO
  public.th_people (
    national_id,
    name,
    email,
    phonenumber,
    type,
    address_id
  )
VALUES
  (
    '1203894569',
    'Jökull Þórðarson',
    'jokull.thordarson@email.is',
    '772839123',
    'person',
    'a963b5d1-b450-4612-ab10-8db38c9cbf06'
  );
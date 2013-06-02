object team
attributes :id, :name, :created_at, :updated_at
child :players, :object_root => false do
  attributes :user_account, :type_account, :picture_url
end
node :picture_url, :object_root => false do
  if team.picture.thumb.url.nil?
    '/assets/temp_team.png'
  else
    team.picture.thumb.url
  end
end
